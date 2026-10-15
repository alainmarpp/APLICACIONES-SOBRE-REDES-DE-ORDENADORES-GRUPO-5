import { router, useLocalSearchParams } from "expo-router";

export function useHistorialPerroScreen() {
  const { usuario } = useLocalSearchParams();

  const volverAlMenu = () => {
    router.push({
      pathname: "/inicio",
      params: { usuario },
    });
  };

  return {
    volverAlMenu,
  };
}