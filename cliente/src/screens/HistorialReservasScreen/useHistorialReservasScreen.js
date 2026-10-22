
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { peticion } from "../../services/api";

const primerValor = (valor) =>
  Array.isArray(valor) ? valor[0] : valor;

export function useHistorialReservasScreen() {
  const params = useLocalSearchParams();
  const usuario = primerValor(params.usuario) ?? "";

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

      setReservas((anteriores) =>
        anteriores.filter(
          (reserva) => String(reserva.id) !== String(id)
        )
      );
    } catch (e) {
      Alert.alert(
        "Error",
        e.message || "No se pudo eliminar la reserva."
      );
    }
  };

  const modificarReserva = (reserva) => {
    router.push({
      pathname: "/servicios",
      params: {
        usuario,
        reservaId: String(reserva.id),
        fechaActual: String(reserva.fecha).slice(0, 10),
        horaActual: String(reserva.horainicio).slice(0, 5),
        serviciosActuales: String(
          reserva.servicio || reserva.servicios || ""
        ),
        idAnimal: String(
          reserva.idAnimal ??
          reserva.Animal?.id ??
          reserva.animal?.id ??
          ""
        ),
      },
    });
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
    modificarReserva,
  };
}
