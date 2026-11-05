
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useState } from "react";

import { peticion } from "../../services/api";

const primerValor = (valor) =>
  Array.isArray(valor) ? valor[0] : valor;

const dosDigitos = (valor) =>
  String(valor ?? "").padStart(2, "0");

export function useReservaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const usuario = primerValor(params.usuario) ?? "";
  const dia = primerValor(params.dia);
  const mes = primerValor(params.mes);
  const anio = primerValor(params.anio);
  const hora = primerValor(params.hora) ?? "";
  const serviciosIds = primerValor(params.serviciosIds) ?? "";

  const reservaId = primerValor(params.reservaId);
  const idAnimalOriginal = primerValor(params.idAnimal);

  const modoEdicion = Boolean(reservaId);

  const servicios = (primerValor(params.servicios) ?? "")
    .split(",")
    .map((servicio) => servicio.trim())
    .filter(Boolean);

  const fecha = dia && mes && anio
    ? `${dosDigitos(dia)}/${dosDigitos(mes)}/${anio}`
    : "";

  const fechaIso = dia && mes && anio
    ? `${anio}-${dosDigitos(mes)}-${dosDigitos(dia)}`
    : "";

  const [animales, setAnimales] = useState([]);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(
    idAnimalOriginal ? Number(idAnimalOriginal) : null
  );
  const [cargandoAnimales, setCargandoAnimales] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let cancelado = false;

      const cargarAnimales = async () => {
        try {
          const datos = await peticion("/animales");

          if (cancelado) return;

          setAnimales(datos);

          setAnimalSeleccionado((actual) => {
            if (
              actual &&
              datos.some((animal) => Number(animal.id) === Number(actual))
            ) {
              return actual;
            }

            if (modoEdicion && idAnimalOriginal) {
              return Number(idAnimalOriginal);
            }

            return datos.length === 1 ? datos[0].id : null;
          });
        } catch (error) {
          if (!cancelado) {
            alert(error.message || "No se pudieron cargar los perros.");
          }
        } finally {
          if (!cancelado) setCargandoAnimales(false);
        }
      };

      cargarAnimales();

      return () => {
        cancelado = true;
      };
    }, [modoEdicion, idAnimalOriginal])
  );

  const handleConfirmar = async () => {
    if (!usuario || servicios.length === 0 || !fechaIso || !hora) {
      alert("Faltan datos de la cita");
      return;
    }

    if (!modoEdicion && !animalSeleccionado) {
      alert("Elige para qué perro es la cita");
      return;
    }

    if (enviando) return;

    setEnviando(true);

    try {
      const datosReserva = {
        fecha: fechaIso,
        horainicio: hora,
        servicios: serviciosIds
          .split(",")
          .filter(Boolean),
      };

      if (modoEdicion) {
        await peticion(`/reservas/${reservaId}`, {
          metodo: "PUT",
          cuerpo: datosReserva,
        });

        alert(`¡Reserva modificada para el ${fecha} a las ${hora}!`);

        router.replace({
          pathname: "/historialPerro",
          params: { usuario },
        });
      } else {
        await peticion("/reservas", {
          metodo: "POST",
          cuerpo: {
            ...datosReserva,
            idAnimal: animalSeleccionado,
          },
        });

        alert(`¡Cita confirmada para el ${fecha} a las ${hora}!`);

        router.replace({
          pathname: "/inicio",
          params: { usuario },
        });
      }
    } catch (error) {
      alert(error.message || "No se pudo guardar la reserva.");

      if (error.estado === 409) {
        router.back();
      }
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = () => {
    router.back();
  };

  const irRegistrarPerro = () => {
    router.push({
      pathname: "/registroPerro",
      params: { usuario },
    });
  };

  return {
    usuario,
    servicios,
    fecha,
    hora,
    animales,
    animalSeleccionado,
    setAnimalSeleccionado,
    cargandoAnimales,
    enviando,
    modoEdicion,
    handleConfirmar,
    handleCancelar,
    irRegistrarPerro,
  };
}
