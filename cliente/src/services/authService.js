<<<<<<< HEAD
import { router } from "expo-router";

import { esEncolable, guardarEnColaOffline, sincronizarColaOffline } from "./colaSincronizacion";
import { API_URL } from "./config";
import { fetchConReintentos, generarClaveIdempotencia } from "./red";
import { borrarToken, guardarToken as guardarTokenBase, obtenerToken, obtenerUsuarioDelToken } from "./token";
=======
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { guardarEnColaOffline } from './colaSincronizacion';

const HOST_EXPO = Constants.expoConfig?.hostUri?.split(':')[0];
const HOST = HOST_EXPO || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

export const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${HOST}:3000`;
>>>>>>> main

export { API_URL, borrarToken, obtenerToken, obtenerUsuarioDelToken };

// Al guardar un token nuevo (login o registro) se envían los cambios que estuvieran pendientes
export async function guardarToken(token) {
  await guardarTokenBase(token);
  sincronizarColaOffline();
}

<<<<<<< HEAD
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
=======
export async function obtenerToken() {
  if (Platform.OS === 'web') return localStorage.getItem(TOKEN_KEY);
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function borrarToken() {
  if (Platform.OS === 'web') return localStorage.removeItem(TOKEN_KEY);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function ejecutarConReintentos(fnPeticion, maxReintentos = 3, retardoBaseMs = 1000) {
  for (let intento = 0; intento < maxReintentos; intento++) {
    try {
      return await fnPeticion();
    } catch (error) {
      const esUltimoIntento = intento === maxReintentos - 1;

      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (esUltimoIntento) {
        throw error;
      }

      const tiempoEspera = retardoBaseMs * Math.pow(2, intento);
      await new Promise((resolve) => setTimeout(resolve, tiempoEspera));
    }
  }
>>>>>>> main
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
<<<<<<< HEAD
  const { reintentos, timeoutMs, retardoBaseMs, descripcion, ...init } = options;
=======
  const token = await obtenerToken();

  const metodo = options.method?.toUpperCase() || 'GET';
  const esAccionModificacion = ['POST', 'PUT', 'DELETE'].includes(metodo);
>>>>>>> main

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
<<<<<<< HEAD
    const respuesta = await fetchConReintentos(
      `${API_URL}${path}`,
      { ...init, method: metodo, headers },
      { reintentos, timeoutMs, retardoBaseMs },
    );
=======
    return await ejecutarConReintentos(async () => {
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: headersFinales,
      });

      if (res.status === 401) {
        await borrarToken();
      }

      if (!res.ok) {
          let datosError = {};

          try {
            datosError = await res.clone().json();
          } catch (e) {}

          const errorObj = new Error(
            datosError.error || `Error del servidor. Código HTTP: ${res.status}`
          );

          errorObj.status = res.status;
          throw errorObj;
        }

      return res;
    });
>>>>>>> main

    if (respuesta.status === 401) await borrarToken();
    return respuesta;
  } catch (error) {
<<<<<<< HEAD
    if (error.esErrorDeRed && token && modificaDatos && esEncolable(metodo, path)) {
      await guardarEnColaOffline({ path, metodo, cuerpo: init.body, claveIdempotencia, descripcion });
      return respuestaPendiente();
=======
    const esErrorDeRed = !error.status || error.message.includes('Network request failed');

    if (esAccionModificacion && metodo !== 'DELETE' && esErrorDeRed) {
      await guardarEnColaOffline(path, {
        ...options,
        headers: headersFinales
      });

      return {
        ok: true,
        json: async () => ({
          offline: true,
          mensaje: "Guardado localmente en la cola offline."
        })
      };
>>>>>>> main
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



