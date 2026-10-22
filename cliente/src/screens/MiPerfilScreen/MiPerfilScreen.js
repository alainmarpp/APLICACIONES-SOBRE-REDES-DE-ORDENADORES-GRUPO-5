import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { peticion } from "../../services/api";
import estilos from "./MiPerfilScreenStyles";

export default function MiPerfilScreen() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useFocusEffect(
    useCallback(() => {
      let activo = true;

      async function cargarPerfil() {
        setCargando(true);
        setError("");

        try {
          const datos = await peticion("/perfil");

          if (activo) {
            setPerfil(datos);
          }
        } catch (e) {
          if (activo) {
            setError(e.message);
          }
        } finally {
          if (activo) {
            setCargando(false);
          }
        }
      }

      cargarPerfil();

      return () => {
        activo = false;
      };
    }, [])
  );

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
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Mi perfil</Text>

      {cargando ? (
        <Text style={estilos.texto}>Cargando tus datos...</Text>
      ) : error ? (
        <Text style={estilos.error}>{error}</Text>
      ) : (
        <View style={estilos.tarjeta}>
          <Text style={estilos.etiqueta}>Nombre de usuario</Text>
          <Text style={estilos.valor}>{perfil?.nombre}</Text>

          <Text style={estilos.etiqueta}>Teléfono</Text>
          <Text style={estilos.valor}>{perfil?.tlf}</Text>
        </View>
      )}

      <TouchableOpacity
        style={estilos.boton}
        onPress={() => router.back()}
      >
        <Text style={estilos.textoBoton}>Volver al menú</Text>
      </TouchableOpacity>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <TouchableOpacity
        style={estilos.botonSalir}
        onPress={cerrarSesion}
      >
        <Text style={estilos.textoBotonSalir}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}