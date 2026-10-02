import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ReservaScreenStyles";
import { useReservaScreen } from "./useReservaScreen";

export default function ReservaScreen() {
  const { usuario, servicios, fecha, hora, handleConfirmar, handleCancelar } =
    useReservaScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cita</Text>

      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.value}>{usuario}</Text>

      <Text style={styles.label}>Servicios</Text>
      <Text style={styles.value}>{servicios.join(", ")}</Text>

      <Text style={styles.label}>Fecha</Text>
      <Text style={styles.value}>{fecha}</Text>

      <Text style={styles.label}>Hora</Text>
      <Text style={styles.value}>{hora}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}