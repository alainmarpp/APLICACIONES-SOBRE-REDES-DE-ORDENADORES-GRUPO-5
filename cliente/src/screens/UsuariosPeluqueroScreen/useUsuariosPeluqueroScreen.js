import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";

import { peticion } from "../../services/api";

function confirmar(titulo, mensaje, textoOk, alAceptar) {
  if (Platform.OS === "web") {
    if (window.confirm(`${titulo}\n${mensaje}`)) alAceptar();
    return;
  }
  Alert.alert(titulo, mensaje, [
    { text: "No", style: "cancel" },
    { text: textoOk, style: "destructive", onPress: alAceptar },
  ]);
}

function avisar(titulo, mensaje) {
  if (Platform.OS === "web") window.alert(`${titulo}\n${mensaje}`);
  else Alert.alert(titulo, mensaje);
}

export function useUsuariosPeluqueroScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [yo, setYo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const [lista, perfil] = await Promise.all([peticion("/peluquero/usuarios"), peticion("/perfil")]);
      setUsuarios(lista || []);
      setYo(perfil?.nombre || "");
    } catch (e) {
      setUsuarios([]);
      setError(e.estado === 403 ? "Esta sección es solo para el peluquero." : e.message || "No se pudieron cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargar();
    }, [cargar])
  );

  const cambiarRol = (usuario, rol) => {
    const contratar = rol === "peluquero";
    confirmar(
      contratar ? "Contratar" : "Quitar rol",
      contratar
        ? `${usuario.nombre} pasará a ser peluquero: podrá ver todas las reservas, usuarios y el horario.`
        : `${usuario.nombre} volverá a ser un cliente normal.`,
      contratar ? "Sí, contratar" : "Sí, quitar",
      async () => {
        try {
          await peticion(`/peluquero/usuarios/${encodeURIComponent(usuario.nombre)}/rol`, { metodo: "PUT", cuerpo: { rol } });
          setUsuarios((anteriores) => anteriores.map((u) => (u.nombre === usuario.nombre ? { ...u, rol } : u)));
        } catch (e) {
          avisar("Error", e.message || "No se pudo cambiar el rol.");
        }
      }
    );
  };

  const eliminar = (usuario) => {
    confirmar(
      "Eliminar usuario",
      `Se eliminará a ${usuario.nombre} junto con sus ${usuario.animales} perro(s) y ${usuario.reservas} reserva(s) y sus reseñas. No se puede deshacer.`,
      "Sí, eliminar",
      async () => {
        try {
          await peticion(`/peluquero/usuarios/${encodeURIComponent(usuario.nombre)}`, { metodo: "DELETE" });
          setUsuarios((anteriores) => anteriores.filter((u) => u.nombre !== usuario.nombre));
        } catch (e) {
          if (e.estado === 404) {
            setUsuarios((anteriores) => anteriores.filter((u) => u.nombre !== usuario.nombre));
            return;
          }
          avisar("Error", e.message || "No se pudo eliminar el usuario.");
        }
      }
    );
  };

  return { usuarios, yo, cargando, error, cargar, cambiarRol, eliminar };
}
