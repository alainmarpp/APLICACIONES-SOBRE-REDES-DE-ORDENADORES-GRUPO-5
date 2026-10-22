import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import { useCallback, useState } from "react";
import { peticion } from "../../services/api";
import { Alert } from "react-native";

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

  const eliminarReserva = async (id) => {
    try {
      await peticion(`/reservas/${id}`, {
        metodo: "DELETE",
      });

      setReservas((prevReservas) => prevReservas.filter((r) => r.id !== id));
    } catch (e) {
      Alert.alert("Error", e.message || "No se pudo eliminar la reserva.");
    }
  };

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
    eliminarReserva,
  };
}