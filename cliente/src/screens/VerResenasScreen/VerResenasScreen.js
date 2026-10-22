import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import estilos from "./VerResenasScreenStyles";
import { useVerResenasScreen } from "./useVerResenasScreen";

export default function VerResenasScreen() {
  const { volver } = useVerResenasScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Ver reseñas</Text>

      <View style={estilos.contenido}>
        <Text style={estilos.mensaje}>
          Todavía no hay reseñas disponibles.
        </Text>
      </View>

      <TouchableOpacity
        style={estilos.botonVolver}
        onPress={volver}
      >
        <Text style={estilos.textoBotonVolver}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}