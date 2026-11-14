import { cerrarSesion, fetchAutenticado } from "./authService";
import { API_CONFIGURADA } from "./config";

function mensajeSinConexion() {
  return API_CONFIGURADA
    ? "No se pudo conectar con el servidor. Comprueba tu conexión a Internet e inténtalo de nuevo."
    : "Esta versión de la app no tiene configurada la dirección del servidor.";
}

export async function peticion(ruta, { metodo = "GET", cuerpo, descripcion, reintentos, timeoutMs } = {}) {
  let respuesta;

  try {
    respuesta = await fetchAutenticado(ruta, {
      method: metodo,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
      descripcion,
      reintentos,
      timeoutMs,
    });
  } catch (error) {
    throw new Error(error.esErrorDeRed ? mensajeSinConexion() : error.message);
  }

  let datos = null;

  try {
    datos = await respuesta.json();
  } catch (error) {
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401) await cerrarSesion();

    const fallo = new Error(datos?.error || "Error en el servidor");
    fallo.estado = respuesta.status;
    throw fallo;
  }

  return datos;
}