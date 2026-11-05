import { router } from "expo-router";
import { useState } from "react";

import { peticion } from "../../services/api";

export function useRegistroPerroScreen() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [raza, setRaza] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    if (!nombre.trim() || !edad.trim() || !peso.trim() || !raza.trim()) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    const edadNumero = Number(edad.replace(",", "."));
    const pesoNumero = Number(peso.replace(",", "."));

    if (Number.isNaN(edadNumero) || Number.isNaN(pesoNumero)) {
      alert("La edad y el peso tienen que ser números");
      return;
    }

    if (cargando) return;
    setCargando(true);

    try {
      await peticion("/registrarAnimal", {
        metodo: "POST",
        cuerpo: {
          nombreAnimal: nombre.trim(),
          edad: edadNumero,
          peso: pesoNumero,
          raza: raza.trim(),
        },
      });

      alert(`¡El perro ${nombre.trim()} se ha registrado correctamente!`);

      setNombre("");
      setEdad("");
      setPeso("");
      setRaza("");

      if (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setCargando(false);
    }
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
    cargando,
    handleRegistro,
  };
}
