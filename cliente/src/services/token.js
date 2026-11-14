import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";

export async function guardarToken(token) {
  if (Platform.OS === "web") return localStorage.setItem(TOKEN_KEY, token);
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function obtenerToken() {
  if (Platform.OS === "web") return localStorage.getItem(TOKEN_KEY);
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function borrarToken() {
  if (Platform.OS === "web") return localStorage.removeItem(TOKEN_KEY);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function decodificarBase64Url(texto) {
  const base64 = texto.replace(/-/g, "+").replace(/_/g, "/");
  let acumulado = 0;
  let bits = 0;
  let codificado = "";

  for (const caracter of base64) {
    const valor = ALFABETO.indexOf(caracter);
    if (valor < 0) continue;
    acumulado = (acumulado << 6) | valor;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      codificado += "%" + ((acumulado >> bits) & 0xff).toString(16).padStart(2, "0");
      acumulado &= (1 << bits) - 1;
    }
  }
  return decodeURIComponent(codificado);
}

export async function obtenerUsuarioDelToken() {
  const token = await obtenerToken();
  if (!token) return null;
  try {
    const datos = JSON.parse(decodificarBase64Url(token.split(".")[1]));
    return datos.nombre ?? null;
  } catch (error) {
    return null;
  }
}
