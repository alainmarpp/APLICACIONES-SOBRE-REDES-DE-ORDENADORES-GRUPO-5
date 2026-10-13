import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { peticion } from "../../services/api";

export function useServiciosScreen() {
  const { usuario } = useLocalSearchParams();

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [cargando, setCargando] = useState(true);

  // La lista de servicios viene del servidor
  useEffect(() => {
    let cancelado = false;

    const cargarServicios = async () => {
      try {
        const datos = await peticion("/servicios");
        if (!cancelado) setServiciosDisponibles(datos);
      } catch (error) {
        if (!cancelado) alert(error.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargarServicios();

    return () => {
      cancelado = true;
    };
  }, []);

  const alternarServicio = (id) => {
    setServiciosSeleccionados((anterior) =>
      anterior.includes(id)
        ? anterior.filter((elemento) => elemento !== id)
        : [...anterior, id],
    );
  };

  const manejarContinuar = () => {
    if (serviciosSeleccionados.length === 0) {
      alert("Por favor, selecciona al menos un servicio");
      return;
    }

    const nombresSeleccionados = serviciosDisponibles
      .filter((servicio) => serviciosSeleccionados.includes(servicio.id))
      .map((servicio) => servicio.nombre);

    router.push({
      pathname: "/calendario",
      params: {
        usuario: usuario,
        servicios: JSON.stringify(nombresSeleccionados),
        serviciosIds: serviciosSeleccionados.join(","),
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
