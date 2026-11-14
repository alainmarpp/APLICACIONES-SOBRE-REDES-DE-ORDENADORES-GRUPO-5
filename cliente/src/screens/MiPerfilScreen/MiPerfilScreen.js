import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, router } from "expo-router";

import { peticion } from "../../services/api";
import { cerrarSesionCompleta } from "../../services/authService";
import estilos from "./MiPerfilScreenStyles";
import { useMiPerfilScreen } from "./useMiPerfilScreen";

export default function MiPerfilScreen() {
  const {
    perfil,
    cargando,
    error,
    editando,
    telefono,
    setTelefono,
    guardando,
    eliminando,
    iniciarEdicion,
    cancelarEdicion,
    guardarTelefono,
    eliminarPerfil,
    cerrarSesion,
    volver,
  } = useMiPerfilScreen();
/*
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

  cerrarSesion = async () => {
    try {
      await cerrarSesionCompleta();
      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      router.replace("/");
    }
  };
*/
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

          {editando ? (
            <TextInput
              style={estilos.campo}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Introduce tu teléfono"
              placeholderTextColor="#A88B9A"
              keyboardType="phone-pad"
              maxLength={20}
            />
          ) : (
            <Text style={estilos.valor}>{perfil?.tlf}</Text>
          )}

          {editando ? (
            <>
              <TouchableOpacity
                style={estilos.boton}
                onPress={guardarTelefono}
                disabled={guardando}
              >
                <Text style={estilos.textoBoton}>
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.botonCancelar}
                onPress={cancelarEdicion}
                disabled={guardando}
              >
                <Text style={estilos.textoBotonCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={estilos.boton}
              onPress={iniciarEdicion}
            >
              <Text style={estilos.textoBoton}>
                Editar teléfono
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <TouchableOpacity
        style={estilos.boton}
        onPress={volver}
      >
        <Text style={estilos.textoBoton}>
          Volver al menú
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botonSalir}
        onPress={cerrarSesion}
      >
        <Text style={estilos.textoBotonSalir}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botonEliminar}
        onPress={eliminarPerfil}
        disabled={eliminando || cargando}
      >
        <Text style={estilos.textoBotonEliminar}>
          {eliminando ? "Eliminando..." : "Eliminar perfil"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}