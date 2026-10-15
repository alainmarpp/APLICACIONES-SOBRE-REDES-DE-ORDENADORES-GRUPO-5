import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import estilos from "./HistorialAnimalesScreenStyles";
import { useHistorialAnimalesScreen } from "./useHistorialAnimalesScreen";

export default function HistorialAnimalesScreen() {
  const {
    animales,
    cargando,
    error,
    volverAlMenu,
    irRegistrarPerro,
  } = useHistorialAnimalesScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>
        Historial de animales
      </Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#8C8174" />
      ) : error ? (
        <Text style={estilos.mensaje}>
          {error}
        </Text>
      ) : animales.length === 0 ? (
        <Text style={estilos.mensaje}>
          No hay animales registrados.
        </Text>
      ) : (
        <ScrollView
          style={estilos.lista}
          contentContainerStyle={estilos.contenidoLista}
        >
          {animales.map((animal) => (
            <View
              key={animal.id}
              style={estilos.tarjeta}
            >
              <Text style={estilos.nombre}>
                {animal.nombreAnimal}
              </Text>

              <Text style={estilos.dato}>
                Raza: {animal.raza || "No especificada"}
              </Text>

              <Text style={estilos.dato}>
                Edad: {animal.edad ?? "No especificada"}
              </Text>

              <Text style={estilos.dato}>
                Peso: {animal.peso ?? "No especificado"}
                {animal.peso != null ? " kg" : ""}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={estilos.enlaceRegistro}
        onPress={irRegistrarPerro}
      >
        <Text style={estilos.textoEnlaceRegistro}>
          ¿Deseas registrar un nuevo perro?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.boton}
        onPress={volverAlMenu}
      >
        <Text style={estilos.textoBoton}>
          Volver al menú
        </Text>
      </TouchableOpacity>
    </View>
  );
}