import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

import estilos from "./VerResenasScreenStyles";
import { useVerResenasScreen } from "./useVerResenasScreen";

export default function VerResenasScreen() {
  const { resenas, cargando, error, volver } = useVerResenasScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Ver reseñas</Text>

      <View style={estilos.contenido}>
        {cargando ? (
          <ActivityIndicator size="large" color="#6B6259" />
        ) : error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : resenas.length === 0 ? (
          <Text style={estilos.mensaje}>
            Todavía no hay reseñas disponibles.
          </Text>
        ) : (
          <FlatList
            data={resenas}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={estilos.listaContenedor}
            renderItem={({ item }) => (
              <View style={estilos.tarjetaResena}>
                <Text style={estilos.usuarioResena}>Usuario: {item.usuario}</Text>
                <Text style={estilos.puntuacionResena}>
                  Puntuación: {"⭐".repeat(item.puntuacion)}
                </Text>
                <Text style={estilos.comentarioResena}>
                  Comentario: {item.comentario}
                </Text>
              </View>
            )}
          />
        )}
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