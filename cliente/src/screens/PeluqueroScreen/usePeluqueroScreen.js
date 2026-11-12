import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";

import { peticion } from "../../services/api";
import { cerrarSesionCompleta } from "../../services/authService";

// Fechas en formato AAAA-MM-DD usando la hora local del móvil
function aTexto(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

function desdeTexto(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

export function usePeluqueroScreen() {
  const [fecha, setFecha] = useState(aTexto(new Date()));
  const [citas, setCitas] = useState([]);
  const [proxima, setProxima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarAgenda = useCallback(async (dia) => {
    setCargando(true);
    setError("");
    try {
      const datos = await peticion(`/peluquero/agenda?fecha=${dia}`);
      setCitas(datos?.citas || []);
      setProxima(datos?.proxima || null);
    } catch (e) {
      setCitas([]);
      setProxima(null);
      setError(
        e.estado === 403
          ? "Esta sección es solo para el peluquero."
          : e.message || "No se pudo cargar la agenda."
      );
    } finally {
      setCargando(false);
    }
  }, []);

  // Se recarga al entrar en la pantalla y al cambiar de día
  useFocusEffect(
    useCallback(() => {
      cargarAgenda(fecha);
    }, [fecha, cargarAgenda])
  );

  const cambiarDia = (dias) => {
    const nueva = desdeTexto(fecha);
    nueva.setDate(nueva.getDate() + dias);
    setFecha(aTexto(nueva));
  };

  const irAHoy = () => setFecha(aTexto(new Date()));
  const irAProxima = () => proxima && setFecha(proxima);

  const cancelarDeVerdad = async (cita) => {
    try {
      await peticion(`/peluquero/reservas/${cita.id}`, { metodo: "DELETE" });
      setCitas((anteriores) => anteriores.filter((c) => c.id !== cita.id));
    } catch (e) {
      if (e.estado === 404) {
        // ya no existía (la había cancelado el cliente): se quita de la lista
        setCitas((anteriores) => anteriores.filter((c) => c.id !== cita.id));
        return;
      }
      Alert.alert("Error", e.message || "No se pudo cancelar la cita.");
    }
  };

  const cancelarCita = (cita) => {
    const pregunta = `¿Cancelar la cita de ${cita.perro?.nombre || "este perro"} (${cita.cliente.nombre}) a las ${cita.horainicio}?`;

    if (Platform.OS === "web") {
      if (window.confirm(pregunta)) cancelarDeVerdad(cita);
      return;
    }

    Alert.alert("Cancelar cita", pregunta, [
      { text: "No", style: "cancel" },
      { text: "Sí, cancelar", style: "destructive", onPress: () => cancelarDeVerdad(cita) },
    ]);
  };

  const irAHorario = () => router.push("/horarioTienda");

  const cerrarSesion = async () => {
    try {
      await cerrarSesionCompleta();
    } catch (e) {
      router.replace("/");
    }
  };

  return {
    fecha,
    citas,
    proxima,
    cargando,
    error,
    cambiarDia,
    irAHoy,
    irAProxima,
    cancelarCita,
    irAHorario,
    cerrarSesion,
    recargar: () => cargarAgenda(fecha),
  };
}
