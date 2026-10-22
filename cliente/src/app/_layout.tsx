import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function DisenoRaiz() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="registro"
          options={{
            title: "Crear cuenta",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="inicio"
          options={{
            title: "Pantalla Inicial",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="servicios"
          options={{
            title: "Menú de Servicios",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="resenas"
          options={{
            title: "Reseñas",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="anadirResena"
          options={{
            title: "Añadir una reseña",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="verResenas"
          options={{
            title: "Ver reseñas",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="registroPerro"
          options={{
            title: "Registro del perro",
            headerShown: true,
          }}
        />
        
      <Stack.Screen
        name="historialPerro"
        options={{
          title: "Historial de reservas",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="historialAnimales"
        options={{
          title: "Historial de animales",
          headerShown: true,
        }}
      />


        <Stack.Screen
          name="calendario"
          options={{
            title: "Reserva tu cita",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="reserva"
          options={{
            title: "Reserva Cita",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="explore"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}