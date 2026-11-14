import Constants from "expo-constants";
import { Platform } from "react-native";

const PUERTO_DESARROLLO = 3000;
const DIRECCION_NO_CONFIGURADA = "https://servidor-no-configurado.invalid";

function calcularUrl() {
  const fijada = process.env.EXPO_PUBLIC_API_URL;
  if (fijada) return fijada.trim().replace(/\/+$/, "");

  if (__DEV__) {
    const host = Constants.expoConfig?.hostUri?.split(":")[0];
    if (host) return `http://${host}:${PUERTO_DESARROLLO}`;
    return `http://${Platform.OS === "android" ? "10.0.2.2" : "localhost"}:${PUERTO_DESARROLLO}`;
  }

  console.error("Falta EXPO_PUBLIC_API_URL: esta versión de la app no sabe a qué servidor conectarse.");
  return DIRECCION_NO_CONFIGURADA;
}

export const API_URL = calcularUrl();
export const API_CONFIGURADA = API_URL !== DIRECCION_NO_CONFIGURADA;
