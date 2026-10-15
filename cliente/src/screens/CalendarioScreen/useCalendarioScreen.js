import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
  const [cargandoHoras, setCargandoHoras] = useState(false);

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

  // Pregunta al servidor qué horas hay libres:
  //  - cada vez que se elige un día
  //  - cada vez que la pantalla vuelve a estar visible (por ejemplo, tras un 409
  //    en /reserva), para no enseñar horas que ya ha cogido otra persona
  useFocusEffect(
    useCallback(() => {
      if (!fechaSeleccionada || !serviciosIds) {
        setDisponibilidad(null);
        setCargandoHoras(false);
        return;
      }

      let cancelado = false;
      const fechaIso = `${anioActual}-${dosDigitos(mesActual + 1)}-${dosDigitos(fechaSeleccionada)}`;

      const cargarDisponibilidad = async () => {
        setCargandoHoras(true);
        try {
          const datos = await peticion(
            `/disponibilidad?fecha=${fechaIso}&servicios=${serviciosIds}`,
          );
          if (cancelado) return;

          setDisponibilidad(datos.horas);

          // Si la hora elegida se ha ocupado entretanto, se deselecciona
          setHoraSeleccionada((actual) => {
            const encontrada = datos.horas.find((h) => h.hora === actual);
            return encontrada && encontrada.libre ? actual : null;
          });
        } catch (error) {
          if (!cancelado) {
            setDisponibilidad(null);
            Alert.alert("Error", error.message);
          }
        } finally {
          if (!cancelado) setCargandoHoras(false);
        }
      };

      cargarDisponibilidad();

      return () => {
        cancelado = true;
      };
    }, [fechaSeleccionada, mesActual, anioActual, serviciosIds]),
  );

  const horasDisponibles = disponibilidad
    ? disponibilidad.map((elemento) => elemento.hora)
    : HORAS_POR_DEFECTO;

  // Días anteriores a hoy: no se pueden elegir
  const esDiaPasado = (dia) => {
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return new Date(anioActual, mesActual, dia) < inicioHoy;
  };

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
    if (esDiaPasado(dia)) return;
    setFechaSeleccionada(dia);
    setHoraSeleccionada(null);
  };

  // Una hora está "reservada" (tachada y no seleccionable) si el servidor dice que no está libre
  const estaHoraReservada = (hora) => {
    if (!disponibilidad) return false;

    const encontrada = disponibilidad.find((elemento) => elemento.hora === hora);
    return encontrada ? !encontrada.libre : false;
  };

  const manejarSeleccionHora = (hora) => {
    // Sin datos del servidor (aún no hay día o está cargando) no se puede elegir
    if (!disponibilidad || cargandoHoras) return;
    if (estaHoraReservada(hora)) return;
    setHoraSeleccionada(hora);
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