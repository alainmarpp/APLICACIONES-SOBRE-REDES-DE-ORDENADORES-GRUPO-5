import { router } from "expo-router";
import { useState } from "react";
import { API_URL, guardarToken } from "../../services/authService";

export function useRegisterScreen() {
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleTelefonoChange = (texto) => {
    const soloNumeros = texto.replace(/[^0-9]/g, "").slice(0, 9);
    setTelefono(soloNumeros);
  };

  const handleRegistro = async () => {
    if (!usuario.trim() || !telefono.trim() || !contrasena || !confirmarContrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    if (usuario.trim().length < 6 || usuario.trim().length > 20) {
      alert("El nombre debe tener entre 6 y 20 caracteres.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/;
    if (!passwordRegex.test(contrasena)) {
      alert("La contraseña debe tener al menos 7 caracteres, incluir una mayúscula, una minúscula y un símbolo.");
      return;
    }

    if (telefono.length !== 9) {
      alert("El teléfono debe tener exactamente 9 dígitos numéricos.");
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

    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAEnviar),
      });
      const datos = await res.json();
      
      if (!res.ok) {
        alert(datos.error || "No se pudo crear la cuenta");
        return;
      }

      if (datos.token) {
        await guardarToken(datos.token);
      }

      alert("¡Cuenta registrada con éxito!");
      router.replace({ pathname: "/inicio", params: { usuario: datos.nombre || usuario } });
    } catch (error) {
      alert("No se pudo conectar con el servidor. Asegúrate de que está encendido.");
    } finally {
      setCargando(false);
    }
  };

  return {
    usuario,
    setUsuario,
    telefono,
    setTelefono: handleTelefonoChange, 
    contrasena,
    setContrasena,
    confirmarContrasena,
    setConfirmarContrasena,
    cargando,
    handleRegistro,
  };
}