import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useCalendarioScreen = () => {
  const router = useRouter();
  const { usuario, servicios } = useLocalSearchParams();

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

  const [citasReservadas, setCitasReservadas] = useState([]);

  const diasEnMesActual = new Date(anioActual, mesActual + 1, 0).getDate();

  const diasSinEmpezar = (new Date(anioActual, mesActual, 1).getDay() + 6) % 7;

  const horasDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

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

  const estaHoraReservada = (hora) => {
    if (!fechaSeleccionada) return false;
    return citasReservadas.some(
      (cita) =>
        cita.dia === fechaSeleccionada &&
        cita.mes === mesActual &&
        cita.anio === anioActual &&
        cita.hora === hora,
    );
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