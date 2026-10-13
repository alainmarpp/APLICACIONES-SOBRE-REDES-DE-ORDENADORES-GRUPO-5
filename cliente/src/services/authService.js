import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Expo sabe la IP del ordenador donde está corriendo (sirve para móvil físico, emulador y web).
// Si no la encuentra (por ejemplo usando --tunnel): Emulador Android 10.0.2.2, resto localhost.
// Para forzar una dirección: EXPO_PUBLIC_API_URL=http://IP_DE_TU_PC:3000 en el .env del cliente.
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

// fetch que añade automáticamente el token. Si el servidor responde 401, borra el token.
export async function fetchAutenticado(path, options = {}) {
  const token = await obtenerToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 401) await borrarToken();
  return res;
}

export async function cerrarSesion() {
  await borrarToken();
  router.replace('/');
}