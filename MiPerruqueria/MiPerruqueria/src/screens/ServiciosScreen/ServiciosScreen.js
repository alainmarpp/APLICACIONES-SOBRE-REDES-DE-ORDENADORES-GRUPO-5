
// src/screens/ServicesScreen/ServicesScreen.js
import React from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import styles from './ServiciosScreenStyles';
import { useServiciosScreen } from './useServiciosScreen';

export default function ServiciosScreen() {
  const {
    serviciosDisponibles,
    serviciosSeleccionados,
    toggleServicio,
    handleContinuar
  } = useServiciosScreen();

  const renderItem = ({ item }) => {
    const isSelected = serviciosSeleccionados.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[styles.serviceItem, isSelected && styles.serviceItemSelected]}
        onPress={() => toggleServicio(item.id)}
      >
        <Text style={[styles.serviceText, isSelected && styles.serviceTextSelected]}>
          {item.nombre}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios</Text>
      <Text style={styles.subtitle}>Elige lo que necesita tu mascota hoy</Text>

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