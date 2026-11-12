import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './RegisterScreenStyles'; 
import { useRegisterScreen } from './useRegisterScreen';

export default function RegisterScreen() {
  const { 
    usuario, setUsuario,
    telefono, setTelefono,
    contrasena, setContrasena,
    confirmarContrasena, setConfirmarContrasena,
    handleRegistro 
  } = useRegisterScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Número de teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirma tu contraseña"
        secureTextEntry
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
