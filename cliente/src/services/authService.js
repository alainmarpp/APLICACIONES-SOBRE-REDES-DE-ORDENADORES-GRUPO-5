import { router } from "expo-router";

import { esEncolable, guardarEnColaOffline, sincronizarColaOffline } from "./colaSincronizacion";
import { API_URL } from "./config";
import { fetchConReintentos, generarClaveIdempotencia } from "./red";
import { borrarToken, guardarToken as guardarTokenBase, obtenerToken, obtenerUsuarioDelToken } from "./token";

export { API_URL, borrarToken, obtenerToken, obtenerUsuarioDelToken };

// Al guardar un token nuevo (login o registro) se envían los cambios que estuvieran pendientes
export async function guardarToken(token) {
  await guardarTokenBase(token);
  sincronizarColaOffline();
}

// Respuesta cuando el cambio no se ha podido enviar y se ha guardado para más tarde.
// OJO: quien la reciba NO debe decir "hecho", sino "pendiente" (datos.offline === true).
function respuestaPendiente() {
  return new Response(
    JSON.stringify({
      offline: true,
      mensaje: "Sin conexión: el cambio se ha guardado y se enviará cuando vuelva la red.",
    }),
    { status: 202, headers: { "Content-Type": "application/json" } },
  );
}

// Hace una petición con el token de la sesión.
//  - Devuelve SIEMPRE la respuesta del servidor, sea 200, 400, 401, 409... (quien llama decide).
//  - Reintenta con espera progresiva ante fallos de red o del servidor (5xx).
//  - Las operaciones que modifican datos llevan una Idempotency-Key, igual en todos los reintentos.
//  - Si no hay forma de contactar con el servidor y la operación se puede aplazar, se guarda en la cola
//    local y se devuelve una respuesta con offline: true.
//  - Lanza ErrorDeRed solo si no hay conexión y la operación no se puede aplazar (por ejemplo, un GET).
// Opciones propias: reintentos, timeoutMs, retardoBaseMs, descripcion (texto para avisar de conflictos).
export async function fetchAutenticado(path, options = {}) {
  const { reintentos, timeoutMs, retardoBaseMs, descripcion, ...init } = options;

  const metodo = (init.method || "GET").toUpperCase();
  const modificaDatos = !["GET", "HEAD"].includes(metodo);

  const token = await obtenerToken();
  const claveIdempotencia = modificaDatos
    ? init.headers?.["Idempotency-Key"] || generarClaveIdempotencia()
    : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(claveIdempotencia ? { "Idempotency-Key": claveIdempotencia } : {}),
    ...(init.headers || {}),
  };

  try {
    const respuesta = await fetchConReintentos(
      `${API_URL}${path}`,
      { ...init, method: metodo, headers },
      { reintentos, timeoutMs, retardoBaseMs },
    );

    if (respuesta.status === 401) await borrarToken();
    return respuesta;
  } catch (error) {
    if (error.esErrorDeRed && token && modificaDatos && esEncolable(metodo, path)) {
      await guardarEnColaOffline({ path, metodo, cuerpo: init.body, claveIdempotencia, descripcion });
      return respuestaPendiente();
    }
    throw error;
  }
}

export async function cerrarSesion() {
  await borrarToken();
  router.replace("/");
}

// Cierre de sesión completo: avisa al servidor (para invalidar el token) si hay red y, pase lo que pase,
// cierra la sesión en el móvil. Los cambios pendientes de enviar se conservan.
export async function cerrarSesionCompleta() {
  const token = await obtenerToken();

  if (token) {
    try {
      await fetchConReintentos(
        `${API_URL}/logout`,
        { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } },
        { reintentos: 1, timeoutMs: 5000 },
      );
    } catch (error) {
      console.log("El servidor no respondió, cerrando sesión solo en el móvil.");
    }
  }

  await cerrarSesion();
}



