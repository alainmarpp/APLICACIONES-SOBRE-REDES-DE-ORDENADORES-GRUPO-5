
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
    modoEdicion,
  } = useReservaScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {modoEdicion ? "Modificar reserva" : "Confirmar cita"}
      </Text>

      <View style={styles.tarjeta}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{usuario || "No disponible"}</Text>

        <Text style={styles.label}>Servicios seleccionados</Text>
        <Text style={styles.value}>
          {servicios.length ? servicios.join(", ") : "No hay servicios"}
        </Text>

        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{fecha || "No disponible"}</Text>

        <Text style={styles.label}>Hora</Text>
        <Text style={styles.value}>{hora || "No disponible"}</Text>

        <Text style={styles.label}>Perro</Text>

        {cargandoAnimales ? (
          <Text style={styles.value}>Cargando perros...</Text>
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
        ) : modoEdicion ? (
          <View style={styles.animal}>
            <Text style={styles.textoAnimal}>
              {(
                animales.find(
                  (animal) =>
                    Number(animal.id) === Number(animalSeleccionado)
                ) || {}
              ).nombreAnimal || "Perro de la reserva"}
            </Text>
            <Text style={styles.aviso}>
              Se mantiene el perro de la reserva original.
            </Text>
          </View>
        ) : (
          <View style={styles.listaAnimales}>
            {animales.map((animal) => (
              <TouchableOpacity
                key={animal.id}
                style={[
                  styles.animal,
                  Number(animalSeleccionado) === Number(animal.id) &&
                    styles.animalSeleccionado,
                ]}
                onPress={() => setAnimalSeleccionado(animal.id)}
              >
                <Text style={styles.textoAnimal}>
                  {animal.nombreAnimal}
                  {animal.raza ? ` (${animal.raza})` : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, enviando && styles.botonDeshabilitado]}
        onPress={handleConfirmar}
        disabled={enviando || cargandoAnimales || animales.length === 0}
      >
        <Text style={styles.buttonText}>
          {enviando
            ? "Guardando..."
            : modoEdicion
              ? "Guardar cambios"
              : "Confirmar cita"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={handleCancelar}
        disabled={enviando}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
