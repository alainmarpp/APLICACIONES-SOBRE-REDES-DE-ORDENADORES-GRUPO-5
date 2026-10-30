import Constants from "expo-constants";
import { Platform } from "react-native";

const PUERTO_DESARROLLO = 3000;
const DIRECCION_NO_CONFIGURADA = "https://servidor-no-configurado.invalid";

// Dirección del servidor, por orden de prioridad:
//
// 1) EXPO_PUBLIC_API_URL: la dirección PÚBLICA del servidor (https://...). Se fija al construir la
//    APK (o en cliente/.env al desarrollar) y es la única que funciona en TODOS los dispositivos.
// 2) Solo en desarrollo (Expo Go): la IP del ordenador que ejecuta Expo. Solo vale para móviles que
//    estén en la misma WiFi que ese ordenador. En una APK no existe.
// 3) Si no hay ninguna, la app NO adivina localhost ni 10.0.2.2 (solo existen en tu ordenador o en el
//    emulador): usa una dirección inválida y avisa con un error claro.
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
