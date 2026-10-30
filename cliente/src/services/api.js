import { cerrarSesion, fetchAutenticado } from "./authService";
import { API_CONFIGURADA } from "./config";

function mensajeSinConexion() {
  return API_CONFIGURADA
    ? "No se pudo conectar con el servidor. Comprueba tu conexión a Internet e inténtalo de nuevo."
    : "Esta versión de la app no tiene configurada la dirección del servidor.";
}

// Hace una petición al servidor usando fetchAutenticado (que ya añade el token) y devuelve el JSON.
// Si algo falla lanza un Error con un mensaje listo para enseñar (error.estado = código HTTP).
//
// Si no hay conexión y la operación se puede aplazar (reservar, registrar un perro, reseñas, cancelar),
// NO falla: el cambio queda guardado en el móvil y la respuesta es { offline: true, mensaje }.
// Quien llame debe comprobar datos?.offline para no decir "hecho" cuando solo está pendiente.
//
// Ejemplo:  const animales = await peticion("/animales");
//           const datos = await peticion("/reservas", { metodo: "POST", cuerpo: {...}, descripcion: "Tu reserva del 12/11" });
//           if (datos?.offline) { /* pendiente de enviar */ }
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
    // la respuesta no traía JSON
  }

  if (!respuesta.ok) {
    // Token caducado o inválido: fetchAutenticado ya lo ha borrado, y se vuelve al login
    if (respuesta.status === 401) await cerrarSesion();

    const fallo = new Error(datos?.error || "Error en el servidor");
    fallo.estado = respuesta.status;
    throw fallo;
  }

  return datos;
}
