import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { peticion } from "../../services/api";
import { cerrarSesionCompleta } from "../../services/authService";

export function usePeluqueroMenuScreen() {
  const [citasHoy, setCitasHoy] = useState(null);
  const [nombre, setNombre] = useState("");

  useFocusEffect(
    useCallback(() => {
      let activo = true;
      peticion("/peluquero/agenda")
        .then((datos) => activo && setCitasHoy(datos?.total ?? null))
        .catch(() => activo && setCitasHoy(null));
      peticion("/perfil")
        .then((datos) => activo && setNombre(datos?.nombre || ""))
        .catch(() => {});
      return () => {
        activo = false;
      };
    }, [])
  );

  const irReservas = () => router.push("/peluqueroReservas");
  const irUsuarios = () => router.push("/peluqueroUsuarios");
  const irHorario = () => router.push("/horarioTienda");
  const irInicioClientes = () => (router.canGoBack() ? router.back() : router.replace("/inicio"));

  const cerrarSesion = async () => {
    try {
      await cerrarSesionCompleta();
    } catch (e) {
      router.replace("/");
    }
  };

  return { citasHoy, nombre, irReservas, irUsuarios, irHorario, irInicioClientes, cerrarSesion };
}
