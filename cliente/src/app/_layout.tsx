
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
<<<<<<< HEAD
import { Alert, AppState, StyleSheet, Text, TouchableOpacity, View } from "react-native";
=======
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
>>>>>>> main
import { useEffect, useRef, useState } from "react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useRed } from "../hooks/useRed";
<<<<<<< HEAD
import {
  contarPendientes,
  sincronizarColaOffline,
  suscribirseAPendientes,
  suscribirseASincronizacion,
} from "../services/colaSincronizacion";
=======
import { sincronizarColaOffline } from "../services/colaSincronizacion";
>>>>>>> main

SplashScreen.preventAutoHideAsync();

export default function DisenoRaiz() {
<<<<<<< HEAD
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
          <Stack.Screen name="peluquero" options={{ title: "Menú del peluquero", headerShown: true }} />
          <Stack.Screen name="peluqueroReservas" options={{ title: "Reservas", headerShown: true }} />
          <Stack.Screen name="peluqueroUsuarios" options={{ title: "Usuarios", headerShown: true }} />
          <Stack.Screen name="horarioTienda" options={{ title: "Horario de la tienda", headerShown: true }} />
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
=======
    const { estaConectado } = useRed();
    const conexionAnterior = useRef(estaConectado);
    const [isChecking, setIsChecking] = useState(false);
    const [forzarEstadoRed, setForzarEstadoRed] = useState<boolean | null>(null);

    // Combina el estado en tiempo real del hook con la comprobación manual
    const estadoActual =
        forzarEstadoRed !== null ? forzarEstadoRed : estaConectado;

    useEffect(() => {
        if (!conexionAnterior.current && estadoActual) {
            sincronizarColaOffline();
        }
        conexionAnterior.current = estadoActual;
    }, [estadoActual]);

    // Si la red cambia de forma nativa, limpiamos el estado forzado
    useEffect(() => {
        setForzarEstadoRed(null);
    }, [estaConectado]);

    // Función para reintentar la conexión manualmente
    const handleReconnect = () => {
        setIsChecking(true);

        NetInfo.fetch().then((state) => {
            setForzarEstadoRed(state.isConnected);

            if (state.isConnected) {
                sincronizarColaOffline();
            }

            setIsChecking(false);
        });
    };

    // Si no hay conexión, mostramos la pantalla de aviso
    if (estadoActual === false) {
        return (
            <View style={estilos.contenedorOffline}>
                <Text style={estilos.tituloOffline}>
                    ⚠️ ¡Sin conexión a Internet!
                </Text>

                <Text style={estilos.subtituloOffline}>
                    Se ha perdido la red. Por favor, comprueba tu conexión Wi-Fi
                    o servidor y pulsa reconectar para continuar.
                </Text>

                <TouchableOpacity
                    style={estilos.botonReconectar}
                    onPress={handleReconnect}
                    disabled={isChecking}
                >
                    {isChecking ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={estilos.textoBoton}>
                            Reconectar
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={estilos.contenedor}>
            <ThemeProvider value={DefaultTheme}>
                <AnimatedSplashOverlay />

                <Stack
                    screenOptions={{
                        contentStyle: {
                            flex: 1,
                        },
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="registro"
                        options={{ title: "Crear cuenta", headerShown: true }}
                    />
                    <Stack.Screen
                        name="inicio"
                        options={{ title: "Pantalla Inicial", headerShown: true }}
                    />

                    <Stack.Screen
                      name="localizacion"
                      options={{ title: "Localización", headerShown: true }}
                    />

                    <Stack.Screen
                      name="perfil"
                      options={{ title: "Mi Perfil", headerShown: true }}
                    />
                    <Stack.Screen
                        name="servicios"
                        options={{ title: "Menú de Servicios", headerShown: true }}
                    />
                    <Stack.Screen
                        name="resenas"
                        options={{ title: "Reseñas", headerShown: true }}
                    />
                    <Stack.Screen
                        name="anadirResena"
                        options={{ title: "Añadir Reseña", headerShown: true }}
                    />
                    <Stack.Screen
                        name="verResenas"
                        options={{ title: "Ver Reseñas", headerShown: true }}
                    />
                    <Stack.Screen
                        name="registroPerro"
                        options={{ title: "Registro Perro", headerShown: true }}
                    />
                    <Stack.Screen
                        name="historialPerro"
                        options={{ title: "Historial Reservas", headerShown: true }}
                    />
                    <Stack.Screen
                        name="historialAnimales"
                        options={{ title: "Historial Animales", headerShown: true }}
                    />
                    <Stack.Screen
                        name="calendario"
                        options={{ title: "Reserva Cita", headerShown: true }}
                    />
                    <Stack.Screen
                        name="reserva"
                        options={{ title: "Confirmar Cita", headerShown: true }}
                    />
                    <Stack.Screen
                        name="explore"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </ThemeProvider>
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        minHeight: 0,
        width: "100%",
    },

    contenedorOffline: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    tituloOffline: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ff3b30",
        marginBottom: 12,
        textAlign: "center",
    },

    subtituloOffline: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 22,
    },

    botonReconectar: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
        minWidth: 160,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    textoBoton: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
>>>>>>> main
});
