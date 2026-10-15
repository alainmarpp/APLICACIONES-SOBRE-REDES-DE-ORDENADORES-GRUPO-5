import { Text, TouchableOpacity, View } from "react-native";
import styles from "./ReservaScreenStyles";
import { useReservaScreen } from "./useReservaScreen";

export default function ReservaScreen() {
  const {
    usuario,
    servicios,
    fecha,
    hora,
    animales,
    animalSeleccionado,
    setAnimalSeleccionado,
    cargandoAnimales,
    enviando,
    handleConfirmar,
    handleCancelar,
    irRegistrarPerro,
  } = useReservaScreen();

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

      <Text style={styles.label}>Perro</Text>

      {cargandoAnimales ? (
        <Text style={styles.value}>Cargando...</Text>
      ) : animales.length === 0 ? (
        <>
          <Text style={styles.aviso}>
            Aún no tienes ningún perro registrado.
          </Text>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={irRegistrarPerro}
          >
            <Text style={styles.buttonText}>Registrar perro</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.listaAnimales}>
          {animales.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={[
                styles.animal,
                animalSeleccionado === animal.id && styles.animalSeleccionado,
              ]}
              onPress={() => setAnimalSeleccionado(animal.id)}
            >
              <Text style={styles.textoAnimal}>
                {animal.nombreAnimal} ({animal.raza})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, enviando && styles.botonDeshabilitado]}
        onPress={handleConfirmar}
        disabled={enviando}
      >
        <Text style={styles.buttonText}>
          {enviando ? "Reservando..." : "Confirmar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
