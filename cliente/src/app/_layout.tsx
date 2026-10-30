import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Alert, AppState, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useRed } from "../hooks/useRed";
import {
  contarPendientes,
  sincronizarColaOffline,
  suscribirseAPendientes,
  suscribirseASincronizacion,
} from "../services/colaSincronizacion";

SplashScreen.preventAutoHideAsync();

export default function DisenoRaiz() {
  const { estaConectado } = useRed();
  const conexionAnterior = useRef(estaConectado);
  const [pendientes, setPendientes] = useState(0);

  // Contador de cambios pendientes de enviar (se actualiza solo cuando la cola cambia)
  useEffect(() => {
    contarPendientes().then(setPendientes);
    return suscribirseAPendientes(setPendientes);
  }, []);

  // Al abrir la app se intenta enviar lo que quedara pendiente de otra vez
  useEffect(() => {
    sincronizarColaOffline();
  }, []);

  // Al volver la red se sincroniza
  useEffect(() => {
    if (!conexionAnterior.current && estaConectado) {
      sincronizarColaOffline();
    }
    conexionAnterior.current = estaConectado;
  }, [estaConectado]);

  // Al volver a la app desde segundo plano también se intenta
  useEffect(() => {
    const suscripcion = AppState.addEventListener("change", (estado) => {
      if (estado === "active") sincronizarColaOffline();
    });
    return () => suscripcion.remove();
  }, []);

  // Se avisa de lo que ha pasado al sincronizar: enviados, conflictos (p. ej. hora ya ocupada), sesión caducada
  useEffect(() => {
    return suscribirseASincronizacion((resultado) => {
      const lineas: string[] = [];
      if (resultado.enviadas.length > 0) {
        lineas.push(`Se han enviado ${resultado.enviadas.length} cambio(s) que estaban pendientes.`);
      }
      resultado.conflictos.forEach((c: { descripcion: string; motivo: string }) => {
        lineas.push(`No se pudo aplicar "${c.descripcion}": ${c.motivo}.`);
      });
      if (resultado.sesionCaducada) {
        lineas.push("Tu sesión ha caducado. Inicia sesión de nuevo para enviar los cambios pendientes.");
      }
      if (lineas.length > 0) {
        Alert.alert("Sincronización", lineas.join("\n\n"));
      }
    });
  }, []);

  const hayAviso = !estaConectado || pendientes > 0;

  // La app NO se bloquea sin red: se puede seguir usando y los cambios quedan guardados
  return (
    <View style={estilos.contenedor}>
      {hayAviso && (
        <View style={estilos.aviso}>
          <Text style={estilos.textoAviso}>
            {!estaConectado ? "Sin conexión. " : ""}
            {pendientes > 0
              ? `${pendientes} cambio(s) pendiente(s) de enviar.`
              : "Los cambios se guardarán y se enviarán al volver la red."}
          </Text>
          {estaConectado && pendientes > 0 && (
            <TouchableOpacity style={estilos.botonAviso} onPress={() => sincronizarColaOffline()}>
              <Text style={estilos.textoBotonAviso}>Reintentar</Text>
            </TouchableOpacity>
          )}
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
  aviso: {
    backgroundColor: "#ff9500",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoAviso: { color: "#ffffff", fontSize: 14, flex: 1 },
  botonAviso: { paddingLeft: 12 },
  textoBotonAviso: { color: "#ffffff", fontWeight: "bold", fontSize: 14 },
});
