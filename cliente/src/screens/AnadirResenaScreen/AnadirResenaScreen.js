import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import estilos from "./AnadirResenaScreenStyles";
import { useAnadirResenaScreen } from "./useAnadirResenaScreen";

export default function AnadirResenaScreen() {
  const {
    puntuacion,
    comentario,
    setComentario,
    seleccionarEstrellas,
    publicarResena,
    volver,
  } = useAnadirResenaScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>
        Añadir una reseña
      </Text>

      <Text style={estilos.subtitulo}>
        ¿Cómo ha sido tu experiencia?
      </Text>

      <Text style={estilos.etiqueta}>
        Tu puntuación
      </Text>

      <View style={estilos.estrellas}>
        {[1, 2, 3, 4, 5].map((estrella) => (
          <TouchableOpacity
            key={estrella}
            onPress={() => seleccionarEstrellas(estrella)}
          >
            <Text style={estilos.estrella}>
              {estrella <= puntuacion ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={estilos.etiqueta}>
        Tu comentario
      </Text>

      <TextInput
        style={estilos.campoComentario}
        placeholder="Escribe tu comentario..."
        multiline
        value={comentario}
        onChangeText={setComentario}
        textAlignVertical="top"
      />

      <TouchableOpacity
        style={estilos.boton}
        onPress={publicarResena}
      >
        <Text style={estilos.textoBoton}>
          Publicar reseña
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botonVolver}
        onPress={volver}
      >
        <Text style={estilos.textoBotonVolver}>
          Volver
        </Text>
      </TouchableOpacity>
    </View>
  );
}
