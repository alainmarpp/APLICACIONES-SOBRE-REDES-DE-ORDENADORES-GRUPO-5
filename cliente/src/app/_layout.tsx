import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useRed } from "../hooks/useRed";
import { sincronizarColaOffline } from "../services/colaSincronizacion"; 

SplashScreen.preventAutoHideAsync();

export default function DisenoRaiz() {
  const { estaConectado } = useRed();
  const conexionAnterior = useRef(estaConectado);

  useEffect(() => {
    if (!conexionAnterior.current && estaConectado) {
      sincronizarColaOffline();
    }
    conexionAnterior.current = estaConectado;
  }, [estaConectado]);

  return (
    <View style={estilos.contenedor}>
      {!estaConectado && (
        <View style={estilos.bannerOffline}>
          <Text style={estilos.textoOffline}>
            ⚠️ Sin conexión a Internet. Las acciones se guardarán y sincronizarán al volver.
          </Text>
        </View>
      )}

      <ThemeProvider value={DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="registro" options={{ title: "Crear cuenta", headerShown: true }} />
          <Stack.Screen name="inicio" options={{ title: "Pantalla Inicial", headerShown: true }} />
          <Stack.Screen name="servicios" options={{ title: "Menú de Servicios", headerShown: true }} />
          <Stack.Screen name="resenas" options={{ title: "Reseñas", headerShown: true }} />
          <Stack.Screen name="anadirResena" options={{ title: "Añadir una reseña", headerShown: true }} />
          <Stack.Screen name="verResenas" options={{ title: "Ver reseñas", headerShown: true }} />
          <Stack.Screen name="registroPerro" options={{ title: "Registro del perro", headerShown: true }} />
          <Stack.Screen name="historialPerro" options={{ title: "Historial de reservas", headerShown: true }} />
          <Stack.Screen name="historialAnimales" options={{ title: "Historial de animales", headerShown: true }} />
          <Stack.Screen name="calendario" options={{ title: "Reserva tu cita", headerShown: true }} />
          <Stack.Screen name="reserva" options={{ title: "Reserva Cita", headerShown: true }} />
          <Stack.Screen name="explore" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1 },
  bannerOffline: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  textoOffline: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});