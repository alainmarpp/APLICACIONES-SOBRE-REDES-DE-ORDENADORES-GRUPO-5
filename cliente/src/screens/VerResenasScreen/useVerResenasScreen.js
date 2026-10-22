import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { peticion } from "../../services/api";

export function useVerResenasScreen() {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let cancelado = false;

      const cargarResenas = async () => {
        setCargando(true);
        setError("");

        try {
          const datos = await peticion("/resenas");

          if (!cancelado) {
            setResenas(Array.isArray(datos) ? datos : []);
          }
        } catch (e) {
          if (!cancelado) {
            setError(
              e.message || "No se pudieron cargar las reseñas."
            );
          }
        } finally {
          if (!cancelado) {
            setCargando(false);
          }
        }
      };

      cargarResenas();

      return () => {
        cancelado = true;
      };
    }, [])
  );

  const volver = () => {
    router.back();
  };

  return {
    resenas,
    cargando,
    error,
    volver,
  };
}