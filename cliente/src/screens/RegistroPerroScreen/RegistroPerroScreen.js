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
      <Text style={styles.title}>Nuevo Animal</Text>
      <Text style={styles.subtitle}>Cuéntanos</Text>

      <Text style={styles.label}>¿Cómo se llama? 🐾</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Coco, Mía, Bimba..."
        placeholderTextColor="#B5A0AC"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Edad (años) 🎂</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 2"
        placeholderTextColor="#B5A0AC"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <Text style={styles.label}>Peso (kg) ⚖️</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 8.5"
        placeholderTextColor="#B5A0AC"
        keyboardType="decimal-pad"
        value={peso}
        onChangeText={setPeso}
      />

      <Text style={styles.label}>Raza o mezcla 🐕‍🦺</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Caniche, Mestizo..."
        placeholderTextColor="#B5A0AC"
        value={raza}
        onChangeText={setRaza}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Guardar perfil ✨</Text>
      </TouchableOpacity>
    </View>
  );
}