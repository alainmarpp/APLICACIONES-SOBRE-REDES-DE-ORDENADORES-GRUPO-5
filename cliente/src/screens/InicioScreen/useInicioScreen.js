import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { cerrarSesionCompleta, fetchAutenticado } from "../../services/authService";

export function useInicioScreen() {
  const { usuario } = useLocalSearchParams();
  const [esPeluquero, setEsPeluquero] = useState(false);

  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const res = await fetchAutenticado("/perfil");
        if (res.ok) {
          const datos = await res.json();
          if (activo) setEsPeluquero(datos.rol === "peluquero");
        }
      } catch {
        // sin conexión: no se muestra el botón del panel
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  const irPanelPeluquero = () => router.push("/peluquero");

  const irInicio = () => {
    router.push({
      pathname: "/inicio",
      params: { usuario },
    });
  };

  const irMiPerfil = () => {
    router.push("/perfil");
  };

  const irMisAnimales = () => {
    router.push({
      pathname: "/historialAnimales",
      params: { usuario },
    });
  };

  const irHacerReserva = () => {
    router.push({
      pathname: "/servicios",
      params: { usuario },
    });
  };

  const irMisReservas = () => {
    router.push({
      pathname: "/historialPerro",
      params: { usuario },
    });
  };

  const irResenas = () => {
    router.push({
      pathname: "/resenas",
      params: { usuario },
    });
  };

  const irLocalizacion = () => {
    router.push({
      pathname: "/localizacion",
      params: { usuario },
    });
  };

  const cerrarSesion = async () => {
    try {
      await cerrarSesionCompleta();
      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      router.replace("/");
    }
  };

  return {
    irInicio,
    irMiPerfil,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
    irResenas,
    irLocalizacion,
    esPeluquero,
    irPanelPeluquero,
    cerrarSesion,
  };
}