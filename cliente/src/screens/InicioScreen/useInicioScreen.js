import { router, useLocalSearchParams } from "expo-router";
import { cerrarSesionCompleta } from "../../services/authService";

export function useInicioScreen() {
  const { usuario } = useLocalSearchParams();

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
    cerrarSesion,
  };
}