
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useRed } from "../hooks/useRed";
import { sincronizarColaOffline } from "../services/colaSincronizacion";

SplashScreen.preventAutoHideAsync();

export default function DisenoRaiz() {
    const { estaConectado } = useRed();
    const conexionAnterior = useRef(estaConectado);
    const [isChecking, setIsChecking] = useState(false);
    const [forzarEstadoRed, setForzarEstadoRed] = useState(null);

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
});
