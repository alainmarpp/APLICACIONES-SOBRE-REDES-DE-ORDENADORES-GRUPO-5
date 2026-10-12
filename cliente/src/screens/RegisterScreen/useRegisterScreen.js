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

    const datosAEnviar = {
      nombre: usuario.trim(),   
      tlf: telefono.trim(),    
      contrasenia: contrasena 
    };

    console.log("📤 [CLIENTE/Register] Enviando datos al servidor:", datosAEnviar);

    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAEnviar),
      });
      const datos = await res.json();
      
      console.log("📥 [CLIENTE/Register] Respuesta recibida del servidor:", datos);

      if (!res.ok) {
        alert(datos.error || "No se pudo crear la cuenta");
        return;
      }

      // Si el backend devuelve token al registrar, lo guardamos. Si no, protegemos con un opcional ? por seguridad
      if (datos.token) {
        await guardarToken(datos.token);
      }

      alert("¡Cuenta registrada con éxito!");
      router.replace({ pathname: "/inicio", params: { usuario: datos.nombre || usuario } });
    } catch (error) {
      console.error("❌ [CLIENTE/Register] Error de red o servidor:", error);
      alert("No se pudo conectar con el servidor. Asegúrate de que está encendido.");
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