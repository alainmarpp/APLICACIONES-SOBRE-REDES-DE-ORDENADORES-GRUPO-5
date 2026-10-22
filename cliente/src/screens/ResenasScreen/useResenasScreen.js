
import { router, useLocalSearchParams } from "expo-router";

export function useResenasScreen() {
  const { usuario } = useLocalSearchParams();

  const irAnadirResena = () => {
    router.push({
      pathname: "/anadirResena",
      params: { usuario },
    });
  };

  const irVerResenas = () => {
    router.push({
      pathname: "/verResenas",
      params: { usuario },
    });
  };

  const volver = () => {
    router.back();
  };

  return {
    irAnadirResena,
    irVerResenas,
    volver,
  };
}
