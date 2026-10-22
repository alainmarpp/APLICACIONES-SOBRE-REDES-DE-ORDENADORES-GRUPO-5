import { useState } from "react";
import { Alert, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { peticion } from "../../services/api";

export function useAnadirResenaScreen() {
  const { usuario } = useLocalSearchParams();
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");

  const seleccionarEstrellas = (estrellas) => {
    setPuntuacion(estrellas);
  };

  const publicarResena = async () => {
    if (puntuacion === 0) {
      Alert.alert(
        "Falta tu puntuación",
        "Selecciona entre 1 y 5 estrellas."
      );
      return;
    }

    if (!comentario.trim()) {
      Alert.alert(
        "Falta tu comentario",
        "Escribe un comentario antes de continuar."
      );
      return;
    }

    try {
      await peticion("/resenas", {
        metodo: "POST",
        cuerpo: {
          puntuacion,
          comentario,
        },
      });

      if (Platform.OS === 'web') {
        window.alert("¡Tu reseña se ha publicado correctamente!");
        router.replace({
          pathname: "/verResenas",
          params: { usuario },
        });
      } else {
        Alert.alert("¡Éxito!", "Tu reseña se ha publicado correctamente.", [
          {
            text: "OK",
            onPress: () => {
              router.replace({
                pathname: "/verResenas",
                params: { usuario },
              });
            },
          },
        ]);
      }
    } catch (e) {
      Alert.alert("Error", e.message || "No se pudo publicar la reseña.");
    }
  };

  const volver = () => {
    router.back();
  };

  return {
    puntuacion,
    comentario,
    setComentario,
    seleccionarEstrellas,
    publicarResena,
    volver,
  };
}