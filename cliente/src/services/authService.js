import { router } from "expo-router";

import { esEncolable, guardarEnColaOffline, sincronizarColaOffline } from "./colaSincronizacion";
import { API_URL } from "./config";
import { fetchConReintentos, generarClaveIdempotencia } from "./red";
import { borrarToken, guardarToken as guardarTokenBase, obtenerToken, obtenerUsuarioDelToken } from "./token";

export { API_URL, borrarToken, obtenerToken, obtenerUsuarioDelToken };

export async function guardarToken(token) {
  await guardarTokenBase(token);
  sincronizarColaOffline();
}

function respuestaPendiente() {
  return new Response(
    JSON.stringify({
      offline: true,
      mensaje: "Sin conexión: el cambio se ha guardado y se enviará cuando vuelva la red.",
    }),
    { status: 202, headers: { "Content-Type": "application/json" } },
  );
}

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



