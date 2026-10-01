import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./RegistroPerroScreenStyles";
import { useRegistroPerroScreen } from "./useRegistroPerroScreen";

export default function RegistroPerroScreen() {
  const {
    nombre,
    setNombre,
    edad,
    setEdad,
    peso,
    setPeso,
    raza,
    setRaza,
    handleRegistro,
  } = useRegistroPerroScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Registro del perro</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Edad</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce la edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el peso"
        keyboardType="decimal-pad"
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.label}>Raza</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce la raza"
        value={raza}
        onChangeText={setRaza}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrar perro</Text>
      </TouchableOpacity>
    </View>
  );
}