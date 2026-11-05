import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { guardarEnColaOffline } from './colaSincronizacion';

const HOST_EXPO = Constants.expoConfig?.hostUri?.split(':')[0];
const HOST = HOST_EXPO || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

export const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${HOST}:3000`;

const TOKEN_KEY = 'auth_token';

export async function guardarToken(token) {
  if (Platform.OS === 'web') return localStorage.setItem(TOKEN_KEY, token);
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

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
}

export async function fetchAutenticado(path, options = {}) {
  const token = await obtenerToken();

  const metodo = options.method?.toUpperCase() || 'GET';
  const esAccionModificacion = ['POST', 'PUT', 'DELETE'].includes(metodo);

  const claveIdempotencia = options.body && esAccionModificacion
    ? (options.headers?.['Idempotency-Key'] || `offline-${Date.now()}-${Math.random()}`)
    : null;

  const headersFinales = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(claveIdempotencia ? { 'Idempotency-Key': claveIdempotencia } : {}),
    ...(options.headers || {}),
  };

  try {
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

  } catch (error) {
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
    }

    throw error;
  }
}

export async function cerrarSesion() {
  await borrarToken();
  router.replace('/');
}