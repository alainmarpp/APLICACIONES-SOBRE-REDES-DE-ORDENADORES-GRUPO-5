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
      const datos = await peticion("/resenas", {
        metodo: "POST",
        descripcion: "Reseña",
        cuerpo: {
          puntuacion,
          comentario,
        },
      });

      // Sin conexión: queda guardada y se enviará sola al volver la red
      const pendiente = datos?.offline === true;

      if (Platform.OS === 'web') {
        window.alert(pendiente ? "Sin conexión: tu reseña se publicará automáticamente cuando vuelva la red." : "¡Tu reseña se ha publicado correctamente!");
        router.replace({
          pathname: "/verResenas",
          params: { usuario },
        });
      } else {
        Alert.alert(
          pendiente ? "Guardada" : "¡Éxito!",
          pendiente ? "Sin conexión: tu reseña se publicará automáticamente cuando vuelva la red." : "Tu reseña se ha publicado correctamente.",
          [
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