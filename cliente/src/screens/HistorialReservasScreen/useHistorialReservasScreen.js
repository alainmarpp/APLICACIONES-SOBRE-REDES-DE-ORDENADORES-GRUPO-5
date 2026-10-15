import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import { useCallback, useState } from "react";
import { peticion } from "../../services/api";

export function useHistorialReservasScreen() {
  const { usuario } = useLocalSearchParams();

  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let cancelado = false;

      const cargarReservas = async () => {
        setCargando(true);
        setError("");

        try {
          const datos = await peticion("/reservas");

          if (!cancelado) {
            setReservas(Array.isArray(datos) ? datos : []);
          }
        } catch (e) {
          if (!cancelado) {
            setError(
              e.message || "No se pudieron cargar las reservas."
            );
          }
        } finally {
          if (!cancelado) {
            setCargando(false);
          }
        }
      };

      cargarReservas();

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

  return {
    reservas,
    cargando,
    error,
    volverAlMenu,
  };
}