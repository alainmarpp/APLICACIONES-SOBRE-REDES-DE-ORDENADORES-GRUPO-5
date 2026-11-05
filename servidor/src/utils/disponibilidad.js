const { bloquesHorario, pasoMinutos } = require('../data/servicios');

function aMinutos(hora) {
  const [h, m] = String(hora).split(':');
  return Number(h) * 60 + Number(m);
}

function aHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function fechaDeHoy() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function calcularHoras(fecha, duracion, reservasDelDia) {
  const hoy = fechaDeHoy();
  const ahora = new Date();
  const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
  const horas = [];

  for (const bloque of bloquesHorario) {
    for (let inicio = bloque.inicio; inicio < bloque.fin; inicio += pasoMinutos) {
      const fin = inicio + duracion;

      const cabeEnElBloque = fin <= bloque.fin;
      const choca = reservasDelDia.some(
        (r) => inicio < aMinutos(r.horafin) && aMinutos(r.horainicio) < fin,
      );
      const yaPasada = fecha < hoy || (fecha === hoy && inicio <= minutosAhora);

      horas.push({ hora: aHora(inicio), libre: cabeEnElBloque && !choca && !yaPasada });
    }
  }

  return horas;
}

module.exports = { aMinutos, aHora, fechaDeHoy, calcularHoras };
