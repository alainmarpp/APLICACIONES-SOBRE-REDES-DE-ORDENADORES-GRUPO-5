import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

export const useCalendarioScreen = () => {
  const { usuario, servicios } = useLocalSearchParams();

  const serviciosSeleccionados = useMemo(() => {
    if (!servicios) return [];
    try {
      return JSON.parse(servicios);
    } catch (error) {
      return [];
    }
  }, [servicios]);

  const hoy = new Date();

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  const [citasReservadas, setCitasReservadas] = useState([]);

  const diasEnMesActual = new Date(anioActual, mesActual + 1, 0).getDate();

  const desfasePrimerDia = (new Date(anioActual, mesActual, 1).getDay() + 6) % 7;

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

    const listaServicios = serviciosSeleccionados.length
      ? serviciosSeleccionados.join(", ")
      : "sin servicios seleccionados";

    setCitasReservadas((anterior) => [
      ...anterior,
      {
        dia: fechaSeleccionada,
        mes: mesActual,
        anio: anioActual,
        hora: horaSeleccionada,
      },
    ]);

    Alert.alert(
      "Cita Confirmada",
      `${usuario ? `${usuario}, tu` : "Tu"} cita (${listaServicios}) ha sido reservada para el día ${fechaSeleccionada}/${mesActual + 1} a las ${horaSeleccionada}.`,
    );

    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
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
    desfasePrimerDia,
    manejarMesAnterior,
    manejarMesSiguiente,
    manejarSeleccionFecha,
    manejarSeleccionHora,
    manejarConfirmarCita,
    estaHoraReservada,
  };
};
