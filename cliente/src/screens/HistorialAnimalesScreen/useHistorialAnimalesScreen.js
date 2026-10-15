import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import { useCallback, useState } from "react";
import { peticion } from "../../services/api";

export function useHistorialAnimalesScreen() {
  const { usuario } = useLocalSearchParams();

  const [animales, setAnimales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let cancelado = false;

      const cargarAnimales = async () => {
        setCargando(true);
        setError("");

        try {
          const datos = await peticion("/animales");

          if (!cancelado) {
            setAnimales(Array.isArray(datos) ? datos : []);
          }
        } catch (e) {
          if (!cancelado) {
            setError(
              e.message || "No se pudieron cargar los animales."
            );
          }
        } finally {
          if (!cancelado) {
            setCargando(false);
          }
        }
      };

      cargarAnimales();

      return () => {
        cancelado = true;
      };
    }, [])
  );

  const volverAlMenu = () => {
    router.push({
      pathname: "/inicio",
      params: { usuario },
    });
  };

  const irRegistrarPerro = () => {
    router.push({
      pathname: "/registroPerro",
      params: { usuario },
    });
  };

  return {
    animales,
    cargando,
    error,
    volverAlMenu,
    irRegistrarPerro,
  };
}