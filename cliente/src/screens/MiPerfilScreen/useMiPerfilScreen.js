import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";
import { useFocusEffect, router } from "expo-router";

import { peticion } from "../../services/api";
import { cerrarSesion as finalizarSesion } from "../../services/authService";

function mostrarMensaje(titulo, mensaje) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensaje}`);
  } else {
    Alert.alert(titulo, mensaje);
  }
}

export function useMiPerfilScreen() {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [editando, setEditando] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

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
            setTelefono(datos.tlf || "");
          }
        } catch (e) {
          if (activo) {
            setError(e.message || "No se pudo cargar el perfil.");
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

  const iniciarEdicion = () => {
    setTelefono(perfil?.tlf || "");
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setTelefono(perfil?.tlf || "");
    setEditando(false);
  };

  const guardarTelefono = async () => {
    const nuevoTelefono = telefono.trim();

    if (!nuevoTelefono) {
      mostrarMensaje("Teléfono", "Introduce un número de teléfono.");
      return;
    }

    if (nuevoTelefono.length < 6 || nuevoTelefono.length > 20) {
      mostrarMensaje(
        "Teléfono",
        "El teléfono debe tener entre 6 y 20 caracteres."
      );
      return;
    }

    try {
      setGuardando(true);

      const respuesta = await peticion("/perfil", {
        metodo: "PUT",
        cuerpo: { tlf: nuevoTelefono },
      });

      setPerfil((actual) => ({
        ...actual,
        tlf: nuevoTelefono,
      }));

      setEditando(false);

      if (respuesta?.offline) {
        mostrarMensaje(
          "Guardado pendiente",
          "El cambio se sincronizará cuando vuelva la conexión."
        );
      } else {
        mostrarMensaje(
          "Perfil actualizado",
          "Tu teléfono se ha actualizado correctamente."
        );
      }
    } catch (e) {
      mostrarMensaje(
        "Error",
        e.message || "No se pudo actualizar el teléfono."
      );
    } finally {
      setGuardando(false);
    }
  };

  const ejecutarEliminacion = async () => {
    try {
      setEliminando(true);

      await peticion("/perfil", {
        metodo: "DELETE",
      });

      await finalizarSesion();
    } catch (e) {
      mostrarMensaje(
        "No se pudo eliminar la cuenta",
        e.message || "Ha ocurrido un error al eliminar tu cuenta."
      );
    } finally {
      setEliminando(false);
    }
  };

  const eliminarPerfil = () => {
    const mensaje =
      "¿Estás segura de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.";

    if (Platform.OS === "web") {
      if (window.confirm(mensaje)) {
        ejecutarEliminacion();
      }
    } else {
      Alert.alert(
        "Eliminar perfil",
        mensaje,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: ejecutarEliminacion,
          },
        ]
      );
    }
  };

  const cerrarSesion = async () => {
    try {
      await peticion("/logout", { metodo: "POST" });
    } catch (e) {
      console.log("No se pudo avisar al servidor:", e);
    } finally {
      await finalizarSesion();
    }
  };

  const volver = () => {
    router.back();
  };

  return {
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
  };
}