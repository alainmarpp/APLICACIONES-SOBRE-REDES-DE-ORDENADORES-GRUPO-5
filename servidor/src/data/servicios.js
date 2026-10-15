// Catálogo de servicios. La duración está en minutos (ajustadla a la realidad de la peluquería).
const servicios = [
  { id: "1", nombre: "Baño + secado", duracion: 60 },
  { id: "2", nombre: "Corte uñas", duracion: 15 },
  { id: "3", nombre: "Completo", duracion: 120 },
  { id: "4", nombre: "Lavado dientes", duracion: 15 },
  { id: "5", nombre: "Tratamiento pulgas y garrapatas", duracion: 30 },
  { id: "6", nombre: "Corte de pelo", duracion: 60 },
];

// Horario de la peluquería (en minutos desde las 00:00) y cada cuánto empieza una cita.
const bloquesHorario = [
  { inicio: 9 * 60, fin: 13 * 60 },
  { inicio: 15 * 60, fin: 19 * 60 },
];
const pasoMinutos = 60;

module.exports = { servicios, bloquesHorario, pasoMinutos };
