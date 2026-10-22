import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";

export function useAnadirResenaScreen() {
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState("");

  const seleccionarEstrellas = (estrellas) => {
    setPuntuacion(estrellas);
  };

  const publicarResena = () => {
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

    Alert.alert(
      "Reseñas",
      "Todavía no se pueden guardar reseñas porque falta conectar la base de datos."
    );
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