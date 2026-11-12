const crypto = require('crypto');
const { Op } = require('sequelize');
const Idempotencia = require('../models/idempotencia.model');

const DURACION_MS = 24 * 60 * 60 * 1000; // una clave se recuerda 24 horas
const ESPERA_MAXIMA_MS = 10 * 1000;      // si la original sigue en curso, se espera hasta 10 s
const SONDEO_MS = 250;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function calcularHuella(req) {
    const ruta = req.originalUrl.split('?')[0];
    return crypto
        .createHash('sha256')
        .update(`${req.method}|${ruta}|${JSON.stringify(req.body ?? {})}`)
        .digest('hex');
}

// Usar DESPUÉS de verificarToken:  router.post('/reservas', verificarToken, idempotencia, handler)
//  - Sin cabecera Idempotency-Key: no hace nada.
//  - Primera vez que llega una clave: ejecuta la petición y guarda el resultado si ha ido bien (2xx).
//  - Misma clave otra vez (reintento): devuelve el resultado guardado sin repetir la operación.
//  - Misma clave mientras la primera sigue en curso: espera a que acabe y devuelve su resultado.
async function idempotencia(req, res, next) {
    const clave = req.headers['idempotency-key'];
    if (!clave) return next();

    if (clave.length > 100) {
        return res.status(400).json({ error: 'Idempotency-Key demasiado larga' });
    }

    const usuario = req.usuario?.nombre || 'anonimo';
    const huella = calcularHuella(req);

    try {
        let registro = null;

        try {
            registro = await Idempotencia.create({ clave, usuario, huella });
        } catch (error) {
            if (error.name !== 'SequelizeUniqueConstraintError') throw error;
        }

        if (!registro) {
            const limite = Date.now() + ESPERA_MAXIMA_MS;

            while (true) {
                const previo = await Idempotencia.findOne({ where: { clave, usuario } });

                // La original falló y borró su registro: esta petición pasa a ser la primera
                if (!previo) return idempotencia(req, res, next);

                if (previo.huella !== huella) {
                    return res.status(422).json({ error: 'Esa Idempotency-Key ya se usó con una petición distinta' });
                }

                if (Date.now() - new Date(previo.creadaEn).getTime() > DURACION_MS) {
                    await previo.destroy();
                    return idempotencia(req, res, next);
                }

                if (previo.estado === 'completada') {
                    res.set('Idempotent-Replayed', 'true');
                    return res.status(previo.codigoRespuesta).json(JSON.parse(previo.cuerpoRespuesta));
                }

                if (Date.now() > limite) {
                    res.set('Retry-After', '2');
                    return res.status(503).json({ error: 'La petición anterior sigue en curso, inténtalo de nuevo en unos segundos' });
                }

                await esperar(SONDEO_MS);
            }
        }

        // Somos la primera: se ejecuta el handler y se guarda su resultado ANTES de responder,
        // para que un reintento inmediato siempre encuentre el resultado ya guardado.
        const jsonOriginal = res.json.bind(res);

        res.json = (cuerpo) => {
            res.json = jsonOriginal;
            const codigo = res.statusCode;

            const guardado = codigo >= 200 && codigo < 300
                ? registro.update({ estado: 'completada', codigoRespuesta: codigo, cuerpoRespuesta: JSON.stringify(cuerpo) })
                : registro.destroy(); // si ha fallado, el reintento debe poder volver a intentarlo

            guardado
                .catch((error) => console.error('Idempotencia: no se pudo guardar el resultado:', error.message))
                .finally(() => jsonOriginal(cuerpo));

            return res;
        };

        next();
    } catch (error) {
        console.error('Error en el middleware de idempotencia:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Limpieza periódica de claves antiguas
const limpiar = () =>
    Idempotencia.destroy({ where: { creadaEn: { [Op.lt]: new Date(Date.now() - DURACION_MS) } } })
        .catch(() => { /* la tabla puede no existir aún en el primer arranque */ });

setInterval(limpiar, 6 * 60 * 60 * 1000).unref();

module.exports = idempotencia;
