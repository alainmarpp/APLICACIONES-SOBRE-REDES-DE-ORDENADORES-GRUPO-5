import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, router } from "expo-router";

import { peticion } from "../../services/api";
import { cerrarSesionCompleta } from "../../services/authService";
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
    // Avisa al servidor si hay red y cierra la sesión en el móvil pase lo que pase.
    // No se borra todo el almacenamiento: los cambios pendientes de enviar se conservan.
    try {
      await cerrarSesionCompleta();
      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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