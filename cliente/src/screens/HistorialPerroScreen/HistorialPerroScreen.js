import { Text, TouchableOpacity, View } from "react-native";

import estilos from "./HistorialPerroScreenStyles";
import { useHistorialPerroScreen } from "./useHistorialPerroScreen";

export default function HistorialPerroScreen() {
  const { volverAlMenu } = useHistorialPerroScreen();

  return (
    <View style={estilos.contenedor}>

      <Text style={estilos.titulo}>
        Historial de Reservas
      </Text>

      <Text style={estilos.historial}>
       No hay reservas por el momento
      </Text>

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