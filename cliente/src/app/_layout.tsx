import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
          name="servicios"
          options={{
            title: "Menú de Servicios",
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="calendario"
          options={{
            title: "Reserva tu cita",
            headerShown: true,
          }}
        />clea

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
