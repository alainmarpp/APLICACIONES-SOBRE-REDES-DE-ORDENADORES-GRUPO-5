const respuestasProcesadas = new Map();

function middlewareIdempotencia(req, res, next) {
  const clave = req.headers['idempotency-key'];

  if (!clave) return next();

  if (respuestasProcesadas.has(clave)) {
    const respuestaGuardada = respuestasProcesadas.get(clave);
    return res.status(respuestaGuardada.status).json(respuestaGuardada.body);
  }

  const jsonOriginal = res.json;
  res.json = function (body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      respuestasProcesadas.set(clave, { status: res.statusCode, body });
      
      setTimeout(() => respuestasProcesadas.delete(clave), 10 * 60 * 1000);
    }
    return jsonOriginal.call(this, body);
  };

  next();
}

module.exports = middlewareIdempotencia;