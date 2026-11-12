// Peticiones HTTP con tiempo máximo y reintentos con espera progresiva (exponential backoff).

// Fallos que merece la pena reintentar: el servidor (o un intermediario) está saturado o arrancando.
// Los demás 4xx (400, 401, 404, 409...) son respuestas definitivas: reintentar no las cambiaría.
const ESTADOS_REINTENTABLES = new Set([408, 425, 429, 500, 502, 503, 504]);

export class ErrorDeRed extends Error {
  constructor(mensaje, causa) {
    super(mensaje);
    this.name = "ErrorDeRed";
    this.esErrorDeRed = true;
    this.causa = causa;
  }
}

export const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Identificador único de una operación. Se genera UNA vez y se reutiliza en todos los reintentos,
// para que el servidor sepa que es la misma operación y no la repita.
export function generarClaveIdempotencia() {
  const aleatorio = globalThis.crypto;
  if (aleatorio?.randomUUID) return aleatorio.randomUUID();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (letra) => {
    const numero = (Math.random() * 16) | 0;
    return (letra === "x" ? numero : (numero & 0x3) | 0x8).toString(16);
  });
}

// fetch con tiempo máximo: sin esto, una petición a un servidor inalcanzable puede quedarse
// colgada durante minutos y los reintentos nunca llegan a producirse.
async function fetchConTiempoMaximo(url, opciones, timeoutMs) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opciones, signal: controlador.signal });
  } finally {
    clearTimeout(temporizador);
  }
}

function esperaIndicadaPorElServidor(respuesta, maximoMs) {
  const segundos = Number(respuesta.headers?.get?.("retry-after"));
  return Number.isFinite(segundos) && segundos > 0 ? Math.min(segundos * 1000, maximoMs) : null;
}

// Devuelve la Response en cuanto el servidor da una respuesta definitiva (sea 200, 400, 409...).
// Reintenta ante fallos de red, tiempo agotado y estados 408/425/429/5xx, esperando cada vez más:
// ~1 s, ~2 s, ~4 s... (con algo de aleatoriedad para que muchos móviles no reintenten a la vez).
// Si se agotan los intentos por fallo de red lanza ErrorDeRed. Si se agotan con un 5xx, devuelve
// esa última respuesta para que quien llama pueda leer el mensaje del servidor.
export async function fetchConReintentos(
  url,
  opciones = {},
  { reintentos = 3, timeoutMs = 15000, retardoBaseMs = 1000, retardoMaxMs = 15000 } = {},
) {
  let ultimaRespuesta = null;
  let ultimoError = null;

  for (let intento = 0; intento < reintentos; intento++) {
    let esperaServidor = null;

    try {
      const respuesta = await fetchConTiempoMaximo(url, opciones, timeoutMs);
      if (!ESTADOS_REINTENTABLES.has(respuesta.status)) return respuesta;

      ultimaRespuesta = respuesta;
      ultimoError = null;
      esperaServidor = esperaIndicadaPorElServidor(respuesta, retardoMaxMs);
    } catch (error) {
      ultimoError = error;
      ultimaRespuesta = null;
    }

    if (intento < reintentos - 1) {
      const tope = Math.min(retardoMaxMs, retardoBaseMs * 2 ** intento);
      await esperar(esperaServidor ?? tope / 2 + Math.random() * (tope / 2));
    }
  }

  if (ultimaRespuesta) return ultimaRespuesta;
  throw new ErrorDeRed("No se pudo contactar con el servidor", ultimoError);
}
