import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useRed() {
  const [estaConectado, setEstaConectado] = useState(true);

  useEffect(() => {
    const desuscribir = NetInfo.addEventListener((state) => {
      setEstaConectado(state.isConnected && state.isInternetReachable !== false);
    });

    return () => desuscribir();
  }, []);

  return { estaConectado };
}
