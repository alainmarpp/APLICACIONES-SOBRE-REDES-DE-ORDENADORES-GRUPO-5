import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "./config";
import { fetchConReintentos } from "./red";
import { obtenerToken, obtenerUsuarioDelToken } from "./token";

// Cola de cambios pendientes de enviar. Se guarda en el almacenamiento del móvil, así que sobrevive
// aunque se cierre la app, y cada cambio sale de la cola solo cuando el servidor confirma que lo ha procesado.
const CLAVE_COLA = "cola_peticiones_pendientes_v2";
const VIDA_MAXIMA_MS = 7 * 24 * 60 * 60 * 1000; // un cambio pendiente más de 7 días se descarta
const MAX_PENDIENTES = 50;

// Solo se encolan operaciones que tiene sentido enviar más tarde.
// NUNCA login/registro/logout: llevan la contraseña y no se pueden aplazar.
const RUTAS_ENCOLABLES = [
  { metodo: "POST", patron: /^\/registrarAnimal$/ },
  { metodo: "PUT", patron: /^\/animales\/\d+$/ },
  { metodo: "DELETE", patron: /^\/animales\/\d+$/ },
  { metodo: "POST", patron: /^\/reservas$/ },
  { metodo: "PUT", patron: /^\/reservas\/\d+$/ },
  { metodo: "DELETE", patron: /^\/reservas\/\d+$/ },
  { metodo: "POST", patron: /^\/resenas$/ },
];

export function esEncolable(metodo, path) {
  return RUTAS_ENCOLABLES.some((ruta) => ruta.metodo === metodo && ruta.patron.test(path));
}

// Acceso a la cola de uno en uno, para que dos operaciones no se pisen al leer y escribir
let turno = Promise.resolve();
function enSerie(tarea) {
  const siguiente = turno.then(tarea);
  turno = siguiente.catch(() => {});
  return siguiente;
}

async function leerCola() {
  try {
    const texto = await AsyncStorage.getItem(CLAVE_COLA);
    const cola = texto ? JSON.parse(texto) : [];
    return Array.isArray(cola) ? cola : [];
  } catch (error) {
    return [];
  }
}

async function escribirCola(cola) {
  await AsyncStorage.setItem(CLAVE_COLA, JSON.stringify(cola));
  oyentesPendientes.forEach((oyente) => oyente(cola.length));
}

// Avisos a la interfaz
const oyentesPendientes = new Set();
const oyentesSincronizacion = new Set();

export function suscribirseAPendientes(oyente) {
  oyentesPendientes.add(oyente);
  return () => oyentesPendientes.delete(oyente);
}

// El oyente recibe { enviadas, conflictos, pendientes, sesionCaducada, sinConexion }
export function suscribirseASincronizacion(oyente) {
  oyentesSincronizacion.add(oyente);
  return () => oyentesSincronizacion.delete(oyente);
}

export async function contarPendientes() {
  return (await leerCola()).length;
}

// Guardar un cambio para enviarlo más tarde.
// claveIdempotencia: la MISMA que se usó en los intentos fallidos. Si el servidor llegó a procesar la
// petición pero se perdió la respuesta, al reenviarla con la misma clave no se duplica.
export function guardarEnColaOffline({ path, metodo, cuerpo, claveIdempotencia, descripcion }) {
  return enSerie(async () => {
    const usuario = await obtenerUsuarioDelToken();
    const cola = await leerCola();

    if (cola.some((entrada) => entrada.claveIdempotencia === claveIdempotencia)) return;

    if (cola.length >= MAX_PENDIENTES) {
      throw new Error("Hay demasiados cambios pendientes de enviar. Conéctate a Internet para sincronizarlos.");
    }

    cola.push({
      claveIdempotencia,
      usuario, // cada cambio solo se envía con la sesión de su dueño
      metodo,
      path,
      cuerpo,
      descripcion: descripcion || `${metodo} ${path}`,
      creadaEn: Date.now(),
    });

    await escribirCola(cola);
  });
}

function quitarDeLaCola(entrada) {
  return enSerie(async () => {
    const cola = await leerCola();
    await escribirCola(cola.filter((e) => e.claveIdempotencia !== entrada.claveIdempotencia));
  });
}

async function leerMotivo(respuesta) {
  try {
    const datos = await respuesta.json();
    return datos?.error || `El servidor respondió ${respuesta.status}`;
  } catch (error) {
    return `El servidor respondió ${respuesta.status}`;
  }
}

async function ejecutarSincronizacion() {
  const resultado = { enviadas: [], conflictos: [], pendientes: 0, sesionCaducada: false, sinConexion: false };

  // Cambios demasiado antiguos: se descartan y se avisa
  await enSerie(async () => {
    const cola = await leerCola();
    const vigentes = cola.filter((e) => Date.now() - e.creadaEn < VIDA_MAXIMA_MS);

    if (vigentes.length !== cola.length) {
      cola
        .filter((e) => !vigentes.includes(e))
        .forEach((e) =>
          resultado.conflictos.push({
            descripcion: e.descripcion,
            motivo: "llevaba más de 7 días sin poder enviarse y se ha descartado",
          }),
        );
      await escribirCola(vigentes);
    }
  });

  const usuario = await obtenerUsuarioDelToken();

  // Sin sesión no se puede enviar nada: se conserva la cola y se avisa de que hay que iniciar sesión
  if (!usuario && (await contarPendientes()) > 0) {
    resultado.sesionCaducada = true;
  }

  // Se envía EN ORDEN (por ejemplo, crear una reserva y luego cancelarla)
  while (usuario) {
    const entrada = await enSerie(async () => (await leerCola()).find((e) => e.usuario === usuario));
    if (!entrada) break;

    // El token se lee ahora, no cuando se guardó el cambio: así se usa siempre el vigente
    const token = await obtenerToken();
    if (!token) {
      resultado.sesionCaducada = true;
      break;
    }

    let respuesta;
    try {
      respuesta = await fetchConReintentos(
        `${API_URL}${entrada.path}`,
        {
          method: entrada.metodo,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Idempotency-Key": entrada.claveIdempotencia,
          },
          body: entrada.cuerpo,
        },
        { reintentos: 2, timeoutMs: 15000 },
      );
    } catch (error) {
      // Sigue sin haber conexión: se conserva TODO y se vuelve a probar más tarde
      resultado.sinConexion = true;
      break;
    }

    // Enviado (o cancelar algo que ya no existe: el resultado final es el que se quería)
    if (respuesta.ok || (respuesta.status === 404 && entrada.metodo === "DELETE")) {
      await quitarDeLaCola(entrada);
      resultado.enviadas.push(entrada);
      continue;
    }

    // La sesión ha caducado: el cambio se conserva hasta que el usuario vuelva a iniciar sesión
    if (respuesta.status === 401) {
      resultado.sesionCaducada = true;
      break;
    }

    // Rechazado de forma definitiva (409 hora ya ocupada, 400 datos no válidos...): reintentarlo no lo
    // arreglaría. Se quita de la cola y se avisa del conflicto.
    if (respuesta.status >= 400 && respuesta.status < 500) {
      resultado.conflictos.push({
        descripcion: entrada.descripcion,
        motivo: await leerMotivo(respuesta),
        estado: respuesta.status,
      });
      await quitarDeLaCola(entrada);
      continue;
    }

    // Error del servidor (5xx): se conserva y se reintenta en la siguiente sincronización
    break;
  }

  resultado.pendientes = await contarPendientes();

  if (resultado.enviadas.length > 0 || resultado.conflictos.length > 0 || resultado.sesionCaducada) {
    oyentesSincronizacion.forEach((oyente) => oyente(resultado));
  }

  return resultado;
}

// Solo puede haber una sincronización a la vez: si se pide mientras hay otra en marcha, se espera a esa
// (así dos disparadores a la vez no envían lo mismo dos veces).
let sincronizando = null;

export function sincronizarColaOffline() {
  if (!sincronizando) {
    sincronizando = ejecutarSincronizacion()
      .catch((error) => {
        console.error("Error al sincronizar la cola offline:", error);
        return null;
      })
      .finally(() => {
        sincronizando = null;
      });
  }
  return sincronizando;
}
