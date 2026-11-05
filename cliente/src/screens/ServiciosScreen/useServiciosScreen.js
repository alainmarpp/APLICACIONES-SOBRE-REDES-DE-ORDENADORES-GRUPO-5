
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { peticion } from "../../services/api";

const primerValor = (valor) =>
  Array.isArray(valor) ? valor[0] : valor;

export function useServiciosScreen() {
  const params = useLocalSearchParams();

  const usuario = primerValor(params.usuario) ?? "";
  const reservaId = primerValor(params.reservaId);
  const fechaActual = primerValor(params.fechaActual);
  const horaActual = primerValor(params.horaActual);
  const serviciosActuales = primerValor(params.serviciosActuales) ?? "";
  const idAnimal = primerValor(params.idAnimal) ?? "";

  const modoEdicion = Boolean(reservaId);

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    const cargarServicios = async () => {
      try {
        const datos = await peticion("/servicios");

        if (cancelado) return;

        setServiciosDisponibles(datos);

        if (modoEdicion) {
          const nombresActuales = serviciosActuales
            .split(",")
            .map((nombre) => nombre.trim().toLowerCase())
            .filter(Boolean);

          const idsActuales = datos
            .filter((servicio) =>
              nombresActuales.includes(
                String(servicio.nombre).trim().toLowerCase()
              )
            )
            .map((servicio) => servicio.id);

          setServiciosSeleccionados(idsActuales);
        }
      } catch (error) {
        if (!cancelado) {
          alert(error.message || "No se pudieron cargar los servicios.");
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargarServicios();

    return () => {
      cancelado = true;
    };
  }, [modoEdicion, serviciosActuales]);

  const alternarServicio = (id) => {
    setServiciosSeleccionados((anterior) =>
      anterior.includes(id)
        ? anterior.filter((elemento) => elemento !== id)
        : [...anterior, id]
    );
  };

  const manejarContinuar = () => {
    if (serviciosSeleccionados.length === 0) {
      alert("Por favor, selecciona al menos un servicio");
      return;
    }

    const nombresSeleccionados = serviciosDisponibles
      .filter((servicio) =>
        serviciosSeleccionados.includes(servicio.id)
      )
      .map((servicio) => servicio.nombre);

    router.push({
      pathname: "/calendario",
      params: {
        usuario,
        servicios: JSON.stringify(nombresSeleccionados),
        serviciosIds: serviciosSeleccionados.join(","),

        ...(modoEdicion
          ? {
              reservaId,
              fechaActual,
              horaActual,
              idAnimal,
            }
          : {}),
      },
    });
  };

  return {
    usuario,
    cargando,
    serviciosDisponibles,
    serviciosSeleccionados,
    alternarServicio,
    manejarContinuar,
  };
}
