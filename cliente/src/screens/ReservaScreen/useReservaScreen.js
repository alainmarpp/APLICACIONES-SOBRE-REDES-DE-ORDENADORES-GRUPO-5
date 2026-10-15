import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { peticion } from "../../services/api";

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
  const serviciosIds = primerValor(params.serviciosIds) ?? "";

  const servicios = (primerValor(params.servicios) ?? "")
    .split(",")
    .map((servicio) => servicio.trim())
    .filter(Boolean);

  const fecha =
    dia && mes && anio ? `${dosDigitos(dia)}/${dosDigitos(mes)}/${anio}` : "";

  const [animales, setAnimales] = useState([]);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  const [cargandoAnimales, setCargandoAnimales] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // Se recarga cada vez que la pantalla vuelve a estar visible
  // (por ejemplo, al volver de registrar un perro nuevo)
  useFocusEffect(
    useCallback(() => {
      let cancelado = false;

      const cargarAnimales = async () => {
        try {
          const datos = await peticion("/animales");
          if (cancelado) return;

          setAnimales(datos);
          setAnimalSeleccionado((actual) => {
            if (actual && datos.some((animal) => animal.id === actual)) {
              return actual;
            }
            return datos.length === 1 ? datos[0].id : null;
          });
        } catch (error) {
          if (!cancelado) alert(error.message);
        } finally {
          if (!cancelado) setCargandoAnimales(false);
        }
      };

      cargarAnimales();

      return () => {
        cancelado = true;
      };
    }, []),
  );

  const handleConfirmar = async () => {
    if (!usuario || servicios.length === 0 || !fecha || !hora) {
      alert("Faltan datos de la cita");
      return;
    }

    if (!animalSeleccionado) {
      alert("Elige para qué perro es la cita");
      return;
    }

    if (enviando) return;
    setEnviando(true);

    try {
      await peticion("/reservas", {
        metodo: "POST",
        cuerpo: {
          idAnimal: animalSeleccionado,
          fecha: `${anio}-${dosDigitos(mes)}-${dosDigitos(dia)}`,
          horainicio: hora,
          servicios: serviciosIds.split(",").filter(Boolean),
        },
      });

      alert(`¡Cita confirmada para el ${fecha} a las ${hora}!`);

      router.replace({
        pathname: "/inicio",
        params: { usuario },
      });
    } catch (error) {
      alert(error.message);

      // 409: alguien ha cogido esa hora mientras tanto, se vuelve al calendario
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
    handleConfirmar,
    handleCancelar,
    irRegistrarPerro,
  };
}
