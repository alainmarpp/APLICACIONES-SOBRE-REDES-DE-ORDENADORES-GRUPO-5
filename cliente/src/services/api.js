import { cerrarSesion, fetchAutenticado } from "./authService";

// Hace una petición al servidor usando vuestro fetchAutenticado (que ya añade el token)
// y devuelve el JSON. Si algo falla lanza un Error con un mensaje listo para enseñar.
//
// Ejemplo:  const animales = await peticion("/animales");
//           await peticion("/animales", { metodo: "POST", cuerpo: { nombreAnimal: "Toby" } });
export async function peticion(ruta, { metodo = "GET", cuerpo } = {}) {
  let respuesta;
  try {
    respuesta = await fetchAutenticado(ruta, {
      method: metodo,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch (error) {
    throw new Error(
      "No se pudo conectar con el servidor. Comprueba que está encendido y que el móvil está en la misma red WiFi.",
    );
  }

  let datos = null;
  try {
    datos = await respuesta.json();
  } catch (error) {
    // la respuesta no traía JSON
  }

  if (!respuesta.ok) {
    // Token caducado o inválido: se vuelve al login
    // (fetchAutenticado ya ha borrado el token, cerrarSesion nos lleva a la pantalla de login)
    if (respuesta.status === 401) {
      await cerrarSesion();
    }

    const fallo = new Error(datos?.error || "Error en el servidor");
    fallo.estado = respuesta.status;
    throw fallo;
  }

  return datos;
}
