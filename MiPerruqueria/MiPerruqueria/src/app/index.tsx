import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💇‍♀️ MiPerruqueria</Text>

      <Text style={styles.welcome}>
        ¡Bienvenida a MiPerruqueria!
      </Text>

      <Text style={styles.subtitle}>
        Reserva tu cita de peluquería de forma rápida y sencilla.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pedir cita</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver servicios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mis citas</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    width: '80%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#e8a0bf',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});