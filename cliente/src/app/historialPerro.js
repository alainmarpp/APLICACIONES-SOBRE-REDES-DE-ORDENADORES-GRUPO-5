import { Stack } from "expo-router";
import HistorialPerroScreen from "../screens/HistorialPerroScreen/HistorialPerroScreen";

export default function HistorialPerro() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Historial del Perro",
        }}
      />
      <HistorialPerroScreen />
    </>
  );
}