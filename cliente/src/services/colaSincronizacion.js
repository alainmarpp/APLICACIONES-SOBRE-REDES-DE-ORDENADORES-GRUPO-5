import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "./config";
import { fetchConReintentos } from "./red";
import { obtenerToken, obtenerUsuarioDelToken } from "./token";

const CLAVE_COLA = "cola_peticiones_pendientes_v2";
const VIDA_MAXIMA_MS = 7 * 24 * 60 * 60 * 1000; // un cambio pendiente más de 7 días se descarta
const MAX_PENDIENTES = 50;

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

const oyentesPendientes = new Set();
const oyentesSincronizacion = new Set();

export function suscribirseAPendientes(oyente) {
  oyentesPendientes.add(oyente);
  return () => oyentesPendientes.delete(oyente);
}

export function suscribirseASincronizacion(oyente) {
  oyentesSincronizacion.add(oyente);
  return () => oyentesSincronizacion.delete(oyente);
}

export async function contarPendientes() {
  return (await leerCola()).length;
}

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
      usuario, 
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

  if (!usuario && (await contarPendientes()) > 0) {
    resultado.sesionCaducada = true;
  }

  while (usuario) {
    const entrada = await enSerie(async () => (await leerCola()).find((e) => e.usuario === usuario));
    if (!entrada) break;

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
      resultado.sinConexion = true;
      break;
    }

    if (respuesta.ok || (respuesta.status === 404 && entrada.metodo === "DELETE")) {
      await quitarDeLaCola(entrada);
      resultado.enviadas.push(entrada);
      continue;
    }

    if (respuesta.status === 401) {
      resultado.sesionCaducada = true;
      break;
    }

    if (respuesta.status >= 400 && respuesta.status < 500) {
      resultado.conflictos.push({
        descripcion: entrada.descripcion,
        motivo: await leerMotivo(respuesta),
        estado: respuesta.status,
      });
      await quitarDeLaCola(entrada);
      continue;
    }

    break;
  }

  resultado.pendientes = await contarPendientes();

  if (resultado.enviadas.length > 0 || resultado.conflictos.length > 0 || resultado.sesionCaducada) {
    oyentesSincronizacion.forEach((oyente) => oyente(resultado));
  }

  return resultado;
}

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
