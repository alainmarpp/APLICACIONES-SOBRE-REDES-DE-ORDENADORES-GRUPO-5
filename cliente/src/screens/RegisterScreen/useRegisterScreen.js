import { router } from "expo-router";
import { useState } from "react";

export function useRegisterScreen() {
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleRegistro = () => {
    if (
      !usuario.trim() ||
      !telefono.trim() ||
      !contrasena ||
      !confirmarContrasena
    ) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("ERROR: Las contraseñas no coinciden");
      return;
    }

    alert("¡Cuenta registrada con éxito!");

    // Pantalla Registro --> Pantalla Login --> Pantalla Servicios

    router.replace("/");
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
    handleRegistro,
  };
}
