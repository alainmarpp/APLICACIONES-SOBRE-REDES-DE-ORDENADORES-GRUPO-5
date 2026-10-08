import { useLocalSearchParams, useRouter } from "expo-router";

const primerValor = (valor) => (Array.isArray(valor) ? valor[0] : valor);

const dosDigitos = (valor) => String(valor ?? "").padStart(2, "0");

export function useReservaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const usuario = primerValor(params.usuario) ?? "";
  const dia = primerValor(params.dia);
  const mes = primerValor(params.mes);
  const anio = primerValor(params.anio);
  const hora = primerValor(params.hora) ?? "";

  const servicios = (primerValor(params.servicios) ?? "")
    .split(",")
    .map((servicio) => servicio.trim())
    .filter(Boolean);

  const fecha =
    dia && mes && anio ? `${dosDigitos(dia)}/${dosDigitos(mes)}/${anio}` : "";

  const handleConfirmar = () => {
    if (!usuario || servicios.length === 0 || !fecha || !hora) {
      alert("Faltan datos de la cita");
      return;
    }

    alert(`¡Cita confirmada para el ${fecha} a las ${hora}!`);
  };

  const handleCancelar = () => {
    router.back();
  };

  return {
    usuario,
    servicios,
    fecha,
    hora,
    handleConfirmar,
    handleCancelar,
  };
}