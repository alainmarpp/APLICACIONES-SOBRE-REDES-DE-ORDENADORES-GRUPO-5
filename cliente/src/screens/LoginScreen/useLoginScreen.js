import { router } from "expo-router";
import { useEffect, useState } from "react";
import { API_URL, fetchAutenticado, guardarToken, obtenerToken } from "../../services/authService";
import { fetchConReintentos } from "../../services/red";

export function useLoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!(await obtenerToken())) return;
        const res = await fetchAutenticado("/perfil");
        if (res.ok) {
          const datos = await res.json();
          router.replace({ pathname: "/inicio", params: { usuario: datos.nombre } });
        }
      } catch { }
    })();
  }, []);

  const handleLogin = async () => {
    if (!usuario.trim() || !contrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    setCargando(true);
    try {
      // Login: se puede repetir sin problema (no crea nada), así que se reintenta con espera progresiva
      const res = await fetchConReintentos(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: usuario.trim(), contrasenia: contrasena }),
        },
        { reintentos: 3, timeoutMs: 15000 },
      );
      const datos = await res.json();

      if (!res.ok) {
        alert(datos.error || "No se pudo iniciar sesión");
        return;
      }

      await guardarToken(datos.token);
      router.replace({ pathname: "/inicio", params: { usuario: datos.nombre } });
    } catch {
      alert("No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const handleIrARegistro = () => {
    router.push("/registro");
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    cargando,
    handleLogin,
    handleIrARegistro,
  };
}