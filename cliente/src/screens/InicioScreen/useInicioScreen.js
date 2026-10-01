import { router, useLocalSearchParams } from "expo-router";

export function useInicioScreen() {
  const { usuario } = useLocalSearchParams();

  const irInicio = () => {
    router.push({
      pathname: "/inicio",
      params: { usuario },
    });
  };

  const irMisAnimales = () => {
    router.push({
      pathname: "/registroPerro",
      params: { usuario },
    });
  };

  const irHacerReserva = () => {
    router.push({
      pathname: "/servicios",
      params: { usuario },
    });
  };

  const irMisReservas = () => {
    alert("La pantalla de Mis reservas estará disponible próximamente.");
  };

  return {
    irInicio,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
  };
}