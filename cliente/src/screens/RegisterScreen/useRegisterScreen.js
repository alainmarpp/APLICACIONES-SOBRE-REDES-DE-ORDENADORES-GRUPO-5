import { router } from "expo-router";
import { useState } from "react";

export function useRegisterScreen() {
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleRegistro = async () => {
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

    try {

      const response = await fetch("http://localhost:3000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: usuario,   
          tlf: telefono,    
          contrasenia: contrasena 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar el usuario");
      }

      alert("¡Cuenta registrada con éxito en la base de datos!");

      router.replace({
        pathname: "/inicio",
        params: { usuario },
      });

    } catch (error) {
      console.error("Error de red o servidor:", error);
      alert("No se pudo conectar con el servidor. Asegúrate de que está encendido.");
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
    handleRegistro,
  };
}