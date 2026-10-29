import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={estilos.pantalla}>
      <KeyboardAvoidingView
        style={estilos.pantalla}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={estilos.pantalla}
          contentContainerStyle={estilos.contenido}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          showsVerticalScrollIndicator={false}
        >
          <Text style={estilos.titulo}>Añadir una reseña</Text>

          <Text style={estilos.subtitulo}>¿Cómo ha sido tu experiencia?</Text>

          <Text style={estilos.etiqueta}>Tu puntuación</Text>

          <View style={estilos.estrellas}>
            {[1, 2, 3, 4, 5].map((estrella) => (
              <TouchableOpacity
                key={estrella}
                onPress={() => seleccionarEstrellas(estrella)}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <Text style={estilos.estrella}>
                  {estrella <= puntuacion ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={estilos.etiqueta}>Tu comentario</Text>

          <TextInput
            style={estilos.campoComentario}
            placeholder="Escribe tu comentario..."
            multiline
            value={comentario}
            onChangeText={setComentario}
            textAlignVertical="top"
            scrollEnabled={false}
          />

          <TouchableOpacity style={estilos.boton} onPress={publicarResena}>
            <Text style={estilos.textoBoton}>Publicar reseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonVolver} onPress={volver}>
            <Text style={estilos.textoBotonVolver}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}