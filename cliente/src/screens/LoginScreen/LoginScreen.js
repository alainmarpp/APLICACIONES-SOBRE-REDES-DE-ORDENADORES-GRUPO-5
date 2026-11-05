import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './LoginScreenStyles'; 
import { useLoginScreen } from './useLoginScreen';

export default function LoginScreen() {
  const { 
    usuario, 
    setUsuario, 
    contrasena, 
    setContrasena, 
    handleLogin, 
    handleIrARegistro 
  } = useLoginScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> MiPerruqueria</Text>
      <Text style={styles.welcome}>¡Bienvenida a MiPerruqueria!</Text>

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>¿No estás registrado?</Text>
      
      <TouchableOpacity style={styles.registerButton} onPress={handleIrARegistro}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
