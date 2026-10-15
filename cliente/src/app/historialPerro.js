import { Stack } from "expo-router";
import HistorialPerroScreen from "../screens/HistorialReservasScreen/HistorialReservasScreen";

export default function HistorialPerro() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Historial de Reservas",
        }}
      />
      <HistorialPerroScreen />
    </>
  );
}