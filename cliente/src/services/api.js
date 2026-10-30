import { cerrarSesion, fetchAutenticado } from "./authService";

export async function peticion(ruta, { metodo = "GET", cuerpo } = {}) {
  let respuesta;

  try {
    respuesta = await fetchAutenticado(ruta, {
      method: metodo,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch (error) {
    if (error.status) {
      throw error;
    }

    throw new Error(
      "No se pudo conectar con el servidor. Comprueba que está encendido y que el dispositivo está en la misma red WiFi."
    );
  }

  let datos = null;

  try {
    datos = await respuesta.json();
  } catch (error) {
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401) {
      await cerrarSesion();
    }

    const fallo = new Error(datos?.error || "Error en el servidor");
    fallo.estado = respuesta.status;
    throw fallo;
  }

  return datos;
}