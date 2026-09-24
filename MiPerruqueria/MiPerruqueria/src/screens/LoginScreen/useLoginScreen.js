import { router } from "expo-router";
import { useState } from "react";

export function useLoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = () => {
    if (!usuario.trim() || !contrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    // Pantalla Login --> Pantalla Servicios
    // Asignar nombre usuario login a pantalla servicios

    router.replace({
      pathname: "/servicios",
      params: {
        usuario: usuario,
      },
    });
  };

  const handleIrARegistro = () => {
    router.push("/registro");
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    handleLogin,
    handleIrARegistro,
  };
}
