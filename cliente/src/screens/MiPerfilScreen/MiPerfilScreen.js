import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, router } from "expo-router";

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
    </View>
  );
}