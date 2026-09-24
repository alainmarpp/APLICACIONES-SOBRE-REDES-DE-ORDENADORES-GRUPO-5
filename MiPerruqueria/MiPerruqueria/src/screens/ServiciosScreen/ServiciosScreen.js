import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import styles from "./ServiciosScreenStyles";
import { useServiciosScreen } from "./useServiciosScreen";

export default function ServiciosScreen() {
  const { usuario } = useLocalSearchParams();

  const {
    serviciosDisponibles,
    serviciosSeleccionados,
    toggleServicio,
    handleContinuar,
  } = useServiciosScreen();

  const renderItem = ({ item }) => {
    const isSelected = serviciosSeleccionados.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.serviceItem, isSelected && styles.serviceItemSelected]}
        onPress={() => toggleServicio(item.id)}
      >
        <Text
          style={[styles.serviceText, isSelected && styles.serviceTextSelected]}
        >
          {item.nombre}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenid@, {usuario}!</Text>

      <Text style={styles.title}>Servicios</Text>

      <Text style={styles.subtitle}>
        Selecciona los servicios que deseas para tu mascota
      </Text>

      <FlatList
        data={serviciosDisponibles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinuar}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
