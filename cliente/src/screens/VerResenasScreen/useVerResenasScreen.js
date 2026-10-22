import { router } from "expo-router";

export function useVerResenasScreen() {
  const volver = () => {
    router.back();
  };

  return {
    volver,
  };
}