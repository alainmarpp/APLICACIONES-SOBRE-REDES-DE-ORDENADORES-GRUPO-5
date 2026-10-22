
import { Text, TouchableOpacity, View } from "react-native";

import estilos from "./ResenaScreenStyles";
import { useResenasScreen } from "./useResenasScreen";

export default function ResenasScreen() {
  const {
    irAnadirResena,
    irVerResenas,
    volver,
  } = useResenasScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Reseñas</Text>

      <Text style={estilos.subtitulo}>
        ¿Qué deseas hacer?
      </Text>

      <TouchableOpacity
        style={estilos.boton}
        onPress={irAnadirResena}
      >
        <Text style={estilos.textoBoton}>
          Añadir una reseña
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.boton}
        onPress={irVerResenas}
      >
        <Text style={estilos.textoBoton}>
          Ver reseñas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botonVolver}
        onPress={volver}
      >
        <Text style={estilos.textoBotonVolver}>
          Volve al Menu
        </Text>
      </TouchableOpacity>
    </View>
  );
}
