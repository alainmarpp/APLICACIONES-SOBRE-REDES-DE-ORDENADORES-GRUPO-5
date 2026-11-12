import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Linking } from "react-native";

export const ESTADO = {
  CARGANDO: "cargando",
  OK: "ok",
  DENEGADO: "denegado",
  ERROR: "error",
};

export const TIENDA = {
  nombre: "Peluquería Canina",
  latitude: 42.8021,
  longitude: -1.6367,
};

const RADIO_TIERRA_METROS = 6371000;

const OPCIONES_GPS = {
  accuracy: Location.Accuracy.High,
  distanceInterval: 5,
  timeInterval: 3000,
};

const aRadianes = (grados) => (grados * Math.PI) / 180;

function distanciaHaversine(origen, destino) {
  const dLat = aRadianes(destino.latitude - origen.latitude);
  const dLon = aRadianes(destino.longitude - origen.longitude);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(aRadianes(origen.latitude)) *
      Math.cos(aRadianes(destino.latitude)) *
      Math.sin(dLon / 2) ** 2;
  return RADIO_TIERRA_METROS * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const abrirAjustes = () => Linking.openSettings();

export const abrirEnMapas = () =>
  Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${TIENDA.latitude},${TIENDA.longitude}`
  );

export function useLocalizacionScreen() {
  const [posicion, setPosicion] = useState(null);
  const [estado, setEstado] = useState(ESTADO.CARGANDO);

  useEffect(() => {
    let activo = true;
    let suscripcion = null;

    async function seguirPosicion() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (activo) setEstado(ESTADO.DENEGADO);
          return;
        }

        const nueva = await Location.watchPositionAsync(OPCIONES_GPS, ({ coords }) => {
          if (!activo) return;
          setPosicion({ latitude: coords.latitude, longitude: coords.longitude });
          setEstado(ESTADO.OK);
        });

        // La pantalla pudo cerrarse mientras se concedía el permiso
        if (activo) suscripcion = nueva;
        else nueva.remove();
      } catch {
        if (activo) setEstado(ESTADO.ERROR);
      }
    }

    seguirPosicion();

    return () => {
      activo = false;
      suscripcion?.remove();
    };
  }, []);

  const distancia = posicion
    ? Math.round(distanciaHaversine(posicion, TIENDA))
    : null;

  return { posicion, distancia, estado };
}