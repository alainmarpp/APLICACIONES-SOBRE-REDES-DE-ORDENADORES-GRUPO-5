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

    router.replace({
      pathname: "/inicio",
      params: { usuario },
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