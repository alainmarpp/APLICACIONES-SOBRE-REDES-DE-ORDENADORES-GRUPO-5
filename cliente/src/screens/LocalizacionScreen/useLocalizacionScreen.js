import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Linking } from "react-native";

export const TIENDA = {
  nombre: "Perruqueria",
  latitude: 42.8021,
  longitude: -1.6367,
};

function distanciaEnMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const rad = (grados) => (grados * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useLocalizacionScreen() {
  const [posicion, setPosicion] = useState(null);
  const [estado, setEstado] = useState("cargando"); 

  useEffect(() => {
    let suscripcion = null;
    let activo = true;

    async function iniciar() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          if (activo) setEstado("denegado");
          return;
        }

        const nuevaSuscripcion = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 5,
            timeInterval: 3000,
          },
          (ubicacion) => {
            if (!activo) return;
            setPosicion({
              latitude: ubicacion.coords.latitude,
              longitude: ubicacion.coords.longitude,
            });
            setEstado("ok");
          }
        );

        if (!activo) {
          nuevaSuscripcion.remove();
          return;
        }

        suscripcion = nuevaSuscripcion;
      } catch (e) {
        if (activo) setEstado("error");
      }
    }

    iniciar();

    return () => {
      activo = false;
      if (suscripcion) suscripcion.remove();
    };
  }, []);

  const distancia = posicion
    ? Math.round(
        distanciaEnMetros(
          posicion.latitude,
          posicion.longitude,
          TIENDA.latitude,
          TIENDA.longitude
        )
      )
    : null;

  const abrirAjustes = () => Linking.openSettings();

  const abrirEnMapas = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${TIENDA.latitude},${TIENDA.longitude}`
    );
  };

  return {
    tienda: TIENDA,
    posicion,
    distancia,
    estado,
    abrirAjustes,
    abrirEnMapas,
  };
}