import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import estilos from "./LocalizacionScreenStyles";
import {
  abrirAjustes,
  abrirEnMapas,
  ESTADO,
  TIENDA,
  useLocalizacionScreen,
} from "./useLocalizacionScreen";

const METROS_POR_MINUTO_A_PIE = 80;
const ALTO_MAPA = { minimo: 220, maximo: 380, proporcion: 0.38 };

const formatearDistancia = (metros) =>
  metros < 1000
    ? `${metros} m`
    : `${(metros / 1000).toFixed(1).replace(".", ",")} km`;

const minutosAPie = (metros) =>
  Math.max(1, Math.round(metros / METROS_POR_MINUTO_A_PIE));

function construirHtml(tienda) {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html, body, #mapa { height: 100%; margin: 0; padding: 0; }
  .pin { display: flex; flex-direction: column; align-items: center; font-family: sans-serif; }
  .etq { color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 12px; margin-bottom: 4px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.15); }
  .burbuja { width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 3px solid; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 3px 6px rgba(0,0,0,0.15); }
  .tienda .etq { background: #8E3E63; }
  .tienda .burbuja { border-color: #8E3E63; background-color: #FFF0F5; }
  .yo .etq { background: #40382F; }
  .yo .burbuja { border-color: #40382F; }
</style>
</head>
<body>
<div id="mapa"></div>
<script>
  var tienda = [${tienda.latitude}, ${tienda.longitude}];
  var mapa = L.map('mapa', { zoomControl: false }).setView(tienda, 16);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(mapa);

  function icono(clase, emoji, texto) {
    return L.divIcon({
      className: '',
      html: '<div class="pin ' + clase + '"><div class="etq">' + texto + '</div><div class="burbuja">' + emoji + '</div></div>',
      iconSize: [130, 75],
      iconAnchor: [65, 75]
    });
  }

  L.marker(tienda, { icon: icono('tienda', '🐶', ${JSON.stringify(tienda.nombre)}) }).addTo(mapa);

  var yo = null;
  var linea = null;
  var ajustado = false;

  function actualizar(lat, lng) {
    var pos = [lat, lng];
    if (!yo) {
      yo = L.marker(pos, { icon: icono('yo', '🙋‍♀️', 'Tú estás aquí') }).addTo(mapa);
      linea = L.polyline([pos, tienda], { color: '#8E3E63', weight: 3, dashArray: '6,6' }).addTo(mapa);
    } else {
      yo.setLatLng(pos);
      linea.setLatLngs([pos, tienda]);
    }
    if (!ajustado) {
      ajustado = true;
      mapa.fitBounds([pos, tienda], { padding: [70, 70] });
    }
  }
</script>
</body>
</html>`;
}

const HTML_MAPA = construirHtml(TIENDA);

function MensajeEstado({ estado, distancia }) {
  switch (estado) {
    case ESTADO.OK:
      return (
        <>
          <Text style={estilos.textoTarjeta}>
            Estás a {formatearDistancia(distancia)} de la peluquería
          </Text>
          <Text style={estilos.textoSecundario}>
            🚶 Unos {minutosAPie(distancia)} min a pie
          </Text>
        </>
      );
    case ESTADO.DENEGADO:
      return (
        <>
          <Text style={estilos.textoTarjeta}>Sin permiso de ubicación</Text>
          <Text style={estilos.textoSecundario}>
            Actívalo en los ajustes para ver la distancia.
          </Text>
        </>
      );
    case ESTADO.ERROR:
      return (
        <Text style={estilos.textoTarjeta}>
          No se pudo obtener tu ubicación. Comprueba que el GPS está activado.
        </Text>
      );
    default:
      return <Text style={estilos.textoTarjeta}>Obteniendo tu ubicación...</Text>;
  }
}

export default function LocalizacionScreen() {
  const { posicion, distancia, estado } = useLocalizacionScreen();
  const { height } = useWindowDimensions();
  const webRef = useRef(null);
  const [mapaListo, setMapaListo] = useState(false);

  const altoMapa = Math.min(
    ALTO_MAPA.maximo,
    Math.max(ALTO_MAPA.minimo, Math.round(height * ALTO_MAPA.proporcion))
  );
  const permisoDenegado = estado === ESTADO.DENEGADO;

  useEffect(() => {
    if (mapaListo && posicion) {
      webRef.current?.injectJavaScript(
        `actualizar(${posicion.latitude}, ${posicion.longitude}); true;`
      );
    }
  }, [mapaListo, posicion]);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView
        contentContainerStyle={estilos.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.cuerpo}>
          <Text style={estilos.titulo}>Localización</Text>
          <Text style={estilos.subtitulo}>Encuentra nuestra peluquería</Text>

          <View style={[estilos.contenedorMapa, { height: altoMapa }]}>
            <WebView
              ref={webRef}
              style={estilos.mapa}
              originWhitelist={["*"]}
              source={{ html: HTML_MAPA, baseUrl: "https://localhost" }}
              nestedScrollEnabled
              onLoadEnd={() => setMapaListo(true)}
            />
          </View>

          <View style={estilos.tarjeta}>
            <MensajeEstado estado={estado} distancia={distancia} />
          </View>

          <TouchableOpacity
            style={estilos.boton}
            onPress={permisoDenegado ? abrirAjustes : abrirEnMapas}
          >
            <Text style={estilos.textoBoton}>
              {permisoDenegado ? "Abrir ajustes" : "Cómo llegar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}