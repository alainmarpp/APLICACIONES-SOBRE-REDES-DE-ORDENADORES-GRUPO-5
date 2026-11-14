const ConfigTienda = require('../models/config.model');
const { bloquesHorario, pasoMinutos } = require('../data/servicios');

const CLAVE = 'horario';
const formatoHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

const aMinutos = (hora) => {
    const [h, m] = hora.split(':');
    return Number(h) * 60 + Number(m);
};

const aHora = (minutos) =>
    `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`;


function horarioPorDefecto() {
    return {
        bloques: bloquesHorario.map((b) => ({ inicio: aHora(b.inicio), fin: aHora(b.fin) })),
        paso: pasoMinutos
    };
}

function textoHorario(bloques) {
    if (!bloques.length) return 'Cerrado temporalmente';
    return 'Abierto de ' + bloques.map((b) => `${b.inicio} a ${b.fin}`).join(' y de ');
}

async function leerHorario() {
    let horario = horarioPorDefecto();
    try {
        const fila = await ConfigTienda.findByPk(CLAVE);
        if (fila) {
            const guardado = JSON.parse(fila.valor);
            if (Array.isArray(guardado.bloques)) horario = { bloques: guardado.bloques, paso: guardado.paso || horario.paso };
        }
    } catch (error) {
        console.error('No se pudo leer el horario guardado, se usa el de por defecto:', error.message);
    }
    return { ...horario, texto: textoHorario(horario.bloques) };
}

async function obtenerHorario() {
    const { bloques, paso } = await leerHorario();
    return {
        bloques: bloques.map((b) => ({ inicio: aMinutos(b.inicio), fin: aMinutos(b.fin) })),
        paso
    };
}

function validarBloques(bloques) {
    if (!Array.isArray(bloques) || bloques.length < 1 || bloques.length > 3) {
        return { error: 'Indica entre 1 y 3 tramos de horario.' };
    }

    const limpios = [];
    for (const b of bloques) {
        if (!b || !formatoHora.test(String(b.inicio)) || !formatoHora.test(String(b.fin))) {
            return { error: 'Las horas deben tener el formato HH:MM (por ejemplo 09:00).' };
        }
        if (aMinutos(b.inicio) >= aMinutos(b.fin)) {
            return { error: `En el tramo ${b.inicio}-${b.fin} la hora de cierre debe ser posterior a la de apertura.` };
        }
        limpios.push({ inicio: b.inicio, fin: b.fin });
    }

    limpios.sort((a, b) => aMinutos(a.inicio) - aMinutos(b.inicio));
    for (let i = 1; i < limpios.length; i++) {
        if (aMinutos(limpios[i].inicio) < aMinutos(limpios[i - 1].fin)) {
            return { error: 'Los tramos de horario no pueden solaparse.' };
        }
    }
    return { bloques: limpios };
}

async function guardarHorario(bloques) {
    const actual = await leerHorario();
    await ConfigTienda.upsert({ clave: CLAVE, valor: JSON.stringify({ bloques, paso: actual.paso }) });
    return leerHorario();
}

module.exports = { leerHorario, obtenerHorario, validarBloques, guardarHorario };
