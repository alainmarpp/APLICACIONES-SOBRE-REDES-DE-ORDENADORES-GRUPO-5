import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export function useServiciosScreen() {
  const { usuario } = useLocalSearchParams();

  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const serviciosDisponibles = [
    { id: "1", nombre: "Baño + secado" },
    { id: "2", nombre: "Corte uñas" },
    { id: "3", nombre: "Completo" },
    { id: "4", nombre: "Lavado dientes" },
    { id: "5", nombre: "Tratamiento pulgas y garrapatas" },
    { id: "6", nombre: "Corte de pelo" },
  ];

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
      },
    });
  };

  return {
    usuario,
    serviciosDisponibles,
    serviciosSeleccionados,
    alternarServicio,
    manejarContinuar,
  };
}
