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

  const cerrarSesion = async () => {
    try {
      // 1. Intentamos avisar al servidor, pero no dejamos que bloquee la app si falla la red
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
        if (tokenGuardado) {
          // Sustituye tu IP si estás en móvil físico (ej. 192.168.1.X)
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

      // 2. Usamos clear() en lugar de removeItem(). 
      // Esto borra TODO el almacenamiento del móvil, garantizando que el token se elimina 
      // sin importar el nombre exacto con el que lo guardaste ('token', 'jwt', etc).
      await AsyncStorage.clear(); 
      
      // 3. Mostramos el aviso y expulsamos al usuario al Login
      alert("Has cerrado sesión correctamente.");
      router.replace("/"); 

    } catch (error) {
      console.error("Error grave al cerrar sesión:", error);
      // Pase lo que pase, lo mandamos al login
      router.replace("/");
    }
  };

  return {
    irInicio,
    irMiPerfil,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
    cerrarSesion,
  };
}