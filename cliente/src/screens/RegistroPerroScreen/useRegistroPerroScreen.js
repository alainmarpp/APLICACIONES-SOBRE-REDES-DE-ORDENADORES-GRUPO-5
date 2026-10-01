import { useState } from "react";

export function useRegistroPerroScreen() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [raza, setRaza] = useState("");

  const handleRegistro = () => {
    if (
      !nombre.trim() ||
      !edad.trim() ||
      !peso.trim() ||
      !raza.trim()
    ) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    alert(`¡El perro ${nombre} se ha registrado correctamente!`);
  };

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    peso,
    setPeso,
    raza,
    setRaza,
    handleRegistro,
  };
}