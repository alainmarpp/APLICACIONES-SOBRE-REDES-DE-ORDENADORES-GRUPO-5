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

    router.push({
      pathname: "/historialPerro",
      params: { usuario },
    });

  };

  return {
    irInicio,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
  };
}