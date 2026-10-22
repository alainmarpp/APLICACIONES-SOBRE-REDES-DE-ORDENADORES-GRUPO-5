import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
        if (tokenGuardado) {
          await fetch("http://10.0.2.2:3000/logout", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${tokenGuardado}`,
              "Content-Type": "application/json"
            }
          });
        }
      } catch (errorRed) {
        console.log("El servidor no respondió, forzando cierre local...");
      }

      await AsyncStorage.clear(); 
      
      alert("Has cerrado sesión correctamente.");
      router.replace("/"); 

    } catch (error) {
      console.error("Error grave al cerrar sesión:", error);
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