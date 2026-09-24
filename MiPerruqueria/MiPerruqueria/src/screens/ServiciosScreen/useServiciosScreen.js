// src/screens/ServicesScreen/useServicesScreen.js
import { useState } from "react";

export function useServiciosScreen() {
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const serviciosDisponibles = [
    { id: "1", nombre: "Baño + secado" },
    { id: "2", nombre: "Corte uñas" },
    { id: "3", nombre: "Completo" },
    { id: "4", nombre: "Lavado dientes" },
    { id: "5", nombre: "Tratamiento pulgas y garrapatas" },
    { id: "6", nombre: "Corte de pelo" },
  ];

  const toggleServicio = (id) => {
    setServiciosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleContinuar = () => {
    if (serviciosSeleccionados.length === 0) {
      alert("Por favor, selecciona al menos un servicio");
      return;
    }

    alert(
      `Has seleccionado ${serviciosSeleccionados.length} servicios. Calculando horario...`,
    );
    // router.push('/calendario');
  };

  return {
    serviciosDisponibles,
    serviciosSeleccionados,
    toggleServicio,
    handleContinuar,
  };
}
