
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegistroScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Crear cuenta</Text>

      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu usuario"
      />

      <Text style={styles.label}>Número de teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu contraseña"
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirma tu contraseña"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  label: {
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  button: {
    width: '80%',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: '#D8D0C4',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

