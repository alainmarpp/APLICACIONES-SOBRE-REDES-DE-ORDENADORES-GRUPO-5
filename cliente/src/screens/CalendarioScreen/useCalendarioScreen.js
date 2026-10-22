
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

import { peticion } from "../../services/api";

const dosDigitos = (numero) => String(numero).padStart(2, "0");

const primerValor = (valor) =>
  Array.isArray(valor) ? valor[0] : valor;

const HORAS_POR_DEFECTO = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export const useCalendarioScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const usuario = primerValor(params.usuario);
  const servicios = primerValor(params.servicios);
  const serviciosIds = primerValor(params.serviciosIds);

  // Datos adicionales cuando se modifica una reserva existente.
  const reservaId = primerValor(params.reservaId);
  const fechaActual = primerValor(params.fechaActual);
  const horaActual = primerValor(params.horaActual);
  const idAnimal = primerValor(params.idAnimal);

  const modoEdicion = Boolean(reservaId);

  const serviciosSeleccionados = (() => {
    if (!servicios) return [];

    try {
      const resultado = JSON.parse(servicios);
      return Array.isArray(resultado) ? resultado : [];
    } catch {
      return String(servicios)
        .split(",")
        .map((servicio) => servicio.trim())
        .filter(Boolean);
    }
  })();

  const hoy = new Date();

  // Si estamos editando, mostrar inicialmente la fecha original.
  const partesFecha = fechaActual
    ? fechaActual.split("-").map(Number)
    : [];

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    partesFecha.length === 3 ? partesFecha[2] : null
  );

  const [horaSeleccionada, setHoraSeleccionada] = useState(
    modoEdicion ? horaActual : null
  );

  const [mesActual, setMesActual] = useState(
    partesFecha.length === 3
      ? partesFecha[1] - 1
      : hoy.getMonth()
  );

  const [anioActual, setAnioActual] = useState(
    partesFecha.length === 3
      ? partesFecha[0]
      : hoy.getFullYear()
  );

  const [disponibilidad, setDisponibilidad] = useState(null);
  const [cargandoHoras, setCargandoHoras] = useState(false);

  const diasEnMesActual = new Date(
    anioActual,
    mesActual + 1,
    0
  ).getDate();

  const diasSinEmpezar =
    (new Date(anioActual, mesActual, 1).getDay() + 6) % 7;

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useFocusEffect(
    useCallback(() => {
      if (!fechaSeleccionada || !serviciosIds) {
        setDisponibilidad(null);
        setCargandoHoras(false);
        return;
      }

      let cancelado = false;

      const fechaIso =
        `${anioActual}-${dosDigitos(mesActual + 1)}-${dosDigitos(fechaSeleccionada)}`;

      const cargarDisponibilidad = async () => {
        setCargandoHoras(true);

        try {
          // Al editar, solicitamos al backend que excluya
          // la reserva actual del cálculo de disponibilidad.
          const consulta = new URLSearchParams({
            fecha: fechaIso,
            servicios: serviciosIds,
          });

          if (modoEdicion) {
            consulta.set("excluirReserva", String(reservaId));
          }

          const datos = await peticion(
            `/disponibilidad?${consulta.toString()}`
          );

          if (cancelado) return;

          setDisponibilidad(datos.horas);

          setHoraSeleccionada((actual) => {
            const encontrada = datos.horas.find(
              (elemento) => elemento.hora.slice(0, 5) === actual
            );

            // No perder la hora original mientras se comprueba
            // su disponibilidad en el modo de edición.
            if (
              modoEdicion &&
              fechaIso === fechaActual &&
              actual === horaActual
            ) {
              return actual;
            }

            return encontrada && encontrada.libre
              ? actual
              : null;
          });
        } catch (error) {
          if (!cancelado) {
            setDisponibilidad(null);
            Alert.alert(
              "Error",
              error.message || "No se pudo consultar la disponibilidad."
            );
          }
        } finally {
          if (!cancelado) setCargandoHoras(false);
        }
      };

      cargarDisponibilidad();

      return () => {
        cancelado = true;
      };
    }, [
      fechaSeleccionada,
      mesActual,
      anioActual,
      serviciosIds,
      modoEdicion,
      reservaId,
      fechaActual,
      horaActual,
    ])
  );

  const horasDisponibles = disponibilidad
    ? disponibilidad.map((elemento) => elemento.hora.slice(0, 5))
    : HORAS_POR_DEFECTO;

  const esDiaPasado = (dia) => {
    const inicioHoy = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate()
    );

    return new Date(anioActual, mesActual, dia) < inicioHoy;
  };

  const manejarMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual((actual) => actual - 1);
    } else {
      setMesActual((actual) => actual - 1);
    }

    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
  };

  const manejarMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual((actual) => actual + 1);
    } else {
      setMesActual((actual) => actual + 1);
    }

    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
  };

  const manejarSeleccionFecha = (dia) => {
    if (esDiaPasado(dia)) return;

    setFechaSeleccionada(dia);
    setHoraSeleccionada(null);
  };

  const estaHoraReservada = (hora) => {
    const fechaIso =
      `${anioActual}-${dosDigitos(mesActual + 1)}-${dosDigitos(fechaSeleccionada)}`;

    // La hora original no debe aparecer bloqueada por la propia reserva.
    if (
      modoEdicion &&
      fechaIso === fechaActual &&
      hora === horaActual
    ) {
      return false;
    }

    if (!disponibilidad) return false;

    const encontrada = disponibilidad.find(
      (elemento) => elemento.hora.slice(0, 5) === hora
    );

    return encontrada ? !encontrada.libre : false;
  };

  const manejarSeleccionHora = (hora) => {
    if (!disponibilidad || cargandoHoras) return;
    if (estaHoraReservada(hora)) return;

    setHoraSeleccionada(hora);
  };

  const manejarConfirmarCita = () => {
    if (!fechaSeleccionada || !horaSeleccionada) {
      Alert.alert(
        "Error",
        "Por favor selecciona un día y una hora para tu cita."
      );
      return;
    }

    router.push({
      pathname: "/reserva",
      params: {
        usuario: usuario ?? "",
        servicios: serviciosSeleccionados.join(","),
        serviciosIds: serviciosIds ?? "",
        dia: fechaSeleccionada,
        mes: mesActual + 1,
        anio: anioActual,
        hora: horaSeleccionada,

        ...(modoEdicion
          ? {
              reservaId: String(reservaId),
              fechaActual: fechaActual ?? "",
              horaActual: horaActual ?? "",
              idAnimal: idAnimal ?? "",
            }
          : {}),
      },
    });
  };

  return {
    usuario,
    serviciosSeleccionados,
    fechaSeleccionada,
    horaSeleccionada,
    horasDisponibles,
    cargandoHoras,
    mesActual,
    anioActual,
    nombresMeses,
    diasEnMesActual,
    diasSinEmpezar,
    esDiaPasado,
    manejarMesAnterior,
    manejarMesSiguiente,
    manejarSeleccionFecha,
    manejarSeleccionHora,
    manejarConfirmarCita,
    estaHoraReservada,
  };
};
