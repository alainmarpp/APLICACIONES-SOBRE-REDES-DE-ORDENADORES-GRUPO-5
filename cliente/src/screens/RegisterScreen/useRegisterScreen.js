import { router } from "expo-router";
import { useState } from "react";
import { API_URL, guardarToken } from "../../services/authService";

export function useRegisterScreen() {
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    if (!usuario.trim() || !telefono.trim() || !contrasena || !confirmarContrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("ERROR: Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: usuario.trim(),
          tlf: telefono.trim(),
          contrasenia: contrasena,
        }),
      });
      const datos = await res.json();

      if (!res.ok) {
        alert(datos.error || "No se pudo crear la cuenta");
        return;
      }

      await guardarToken(datos.token); // el registro ya devuelve token: entra directo
      alert("¡Cuenta registrada con éxito!");
      router.replace({ pathname: "/inicio", params: { usuario: datos.nombre } });
    } catch {
      alert("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return {
    usuario,
    setUsuario,
    telefono,
    setTelefono,
    contrasena,
    setContrasena,
    confirmarContrasena,
    setConfirmarContrasena,
    cargando,
    handleRegistro,
  };
}