import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { peticion } from "../../services/api";

const dosDigitos = (numero) => String(numero).padStart(2, "0");

// Horas que se muestran antes de elegir día (cuando aún no se ha consultado al servidor)
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
  const { usuario, servicios, serviciosIds } = useLocalSearchParams();

  const serviciosSeleccionados = (() => {
    if (!servicios) return [];

    try {
      return JSON.parse(servicios);
    } catch (error) {
      return [];
    }
  })();

  const hoy = new Date();

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  // Respuesta del servidor: [{ hora: "09:00", libre: true }, ...]
  const [disponibilidad, setDisponibilidad] = useState(null);

  const diasEnMesActual = new Date(anioActual, mesActual + 1, 0).getDate();

  const diasSinEmpezar = (new Date(anioActual, mesActual, 1).getDay() + 6) % 7;

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

  // Cada vez que se elige un día, se pregunta al servidor qué horas hay libres
  useEffect(() => {
    if (!fechaSeleccionada || !serviciosIds) {
      setDisponibilidad(null);
      return;
    }

    let cancelado = false;
    const fechaIso = `${anioActual}-${dosDigitos(mesActual + 1)}-${dosDigitos(fechaSeleccionada)}`;

    const cargarDisponibilidad = async () => {
      try {
        const datos = await peticion(
          `/disponibilidad?fecha=${fechaIso}&servicios=${serviciosIds}`,
        );
        if (!cancelado) setDisponibilidad(datos.horas);
      } catch (error) {
        if (!cancelado) {
          setDisponibilidad(null);
          Alert.alert("Error", error.message);
        }
      }
    };

    cargarDisponibilidad();

    return () => {
      cancelado = true;
    };
  }, [fechaSeleccionada, mesActual, anioActual, serviciosIds]);

  const horasDisponibles = disponibilidad
    ? disponibilidad.map((elemento) => elemento.hora)
    : HORAS_POR_DEFECTO;

  const manejarMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual(anioActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }

    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
  };

  const manejarMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }

    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
  };

  const manejarSeleccionFecha = (dia) => {
    setFechaSeleccionada(dia);
    setHoraSeleccionada(null);
  };

  const manejarSeleccionHora = (hora) => {
    setHoraSeleccionada(hora);
  };

  // Una hora está "reservada" (no se puede elegir) si el servidor dice que no está libre
  const estaHoraReservada = (hora) => {
    if (!disponibilidad) return false;

    const encontrada = disponibilidad.find((elemento) => elemento.hora === hora);
    return encontrada ? !encontrada.libre : false;
  };

  const manejarConfirmarCita = () => {
    if (!fechaSeleccionada || !horaSeleccionada) {
      Alert.alert(
        "Error",
        "Por favor selecciona un día y una hora para tu cita.",
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
      },
    });
  };

  return {
    usuario,
    serviciosSeleccionados,
    fechaSeleccionada,
    horaSeleccionada,
    horasDisponibles,
    mesActual,
    anioActual,
    nombresMeses,
    diasEnMesActual,
    diasSinEmpezar,
    manejarMesAnterior,
    manejarMesSiguiente,
    manejarSeleccionFecha,
    manejarSeleccionHora,
    manejarConfirmarCita,
    estaHoraReservada,
  };
};
