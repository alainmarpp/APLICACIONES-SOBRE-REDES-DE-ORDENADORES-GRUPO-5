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
import { useLocalizacionScreen } from "./useLocalizacionScreen";

function formatearDistancia(metros) {
  if (metros < 1000) return `${metros} m`;
  return `${(metros / 1000).toFixed(1).replace(".", ",")} km`;
}

function minutosAPie(metros) {
  return Math.max(1, Math.round(metros / 80));
}

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
  .etq { color: #fff; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 10px; margin-bottom: 4px; white-space: nowrap; }
  .burbuja { width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 3px solid; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .tienda .etq { background: #40382F; }
  .tienda .burbuja { border-color: #40382F; }
  .yo .etq { background: #2F80ED; }
  .yo .burbuja { border-color: #2F80ED; }
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

  L.marker(tienda, { icon: icono('tienda', '🐶', 'Peluquería canina') }).addTo(mapa);

  var yo = null;
  var linea = null;
  var ajustado = false;

  function actualizar(lat, lng) {
    var pos = [lat, lng];
    if (!yo) {
      yo = L.marker(pos, { icon: icono('yo', '🙋', 'Tú estás aquí') }).addTo(mapa);
      linea = L.polyline([pos, tienda], { color: '#40382F', weight: 3, dashArray: '8,8' }).addTo(mapa);
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

export default function LocalizacionScreen() {
  const { tienda, posicion, distancia, estado, abrirAjustes, abrirEnMapas } =
    useLocalizacionScreen();

  const { height: altoPantalla } = useWindowDimensions();
  // El mapa ocupa ~38% de la pantalla, entre 220 y 380 px
  const altoMapa = Math.min(380, Math.max(220, Math.round(altoPantalla * 0.38)));

  const webRef = useRef(null);
  const [listo, setListo] = useState(false);
  const [html] = useState(() => construirHtml(tienda));

  // Cada vez que cambia tu posición, se la pasamos al mapa
  useEffect(() => {
    if (listo && posicion && webRef.current) {
      webRef.current.injectJavaScript(
        `actualizar(${posicion.latitude}, ${posicion.longitude}); true;`
      );
    }
  }, [listo, posicion]);

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView
        style={estilos.pantalla}
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
          source={{ html, baseUrl: "https://localhost" }}
          javaScriptEnabled
          domStorageEnabled
          nestedScrollEnabled
          onLoadEnd={() => setListo(true)}
        />

        {estado === "ok" && (
          <View style={estilos.cartelDistancia}>
            <Text style={estilos.textoCartel}>
              🐾 {formatearDistancia(distancia)}
            </Text>
          </View>
        )}
      </View>

      <View style={estilos.tarjeta}>
        {estado === "cargando" && (
          <Text style={estilos.textoTarjeta}>Obteniendo tu ubicación...</Text>
        )}

        {estado === "ok" && (
          <>
            <Text style={estilos.textoTarjeta}>
              Estás a {formatearDistancia(distancia)} de la peluquería
            </Text>
            <Text style={estilos.textoSecundario}>
              🚶 Unos {minutosAPie(distancia)} min a pie
            </Text>
          </>
        )}

        {estado === "denegado" && (
          <>
            <Text style={estilos.textoTarjeta}>Sin permiso de ubicación</Text>
            <Text style={estilos.textoSecundario}>
              Actívalo en los ajustes para ver la distancia.
            </Text>
          </>
        )}

        {estado === "error" && (
          <Text style={estilos.textoTarjeta}>
            No se pudo obtener tu ubicación. Comprueba que el GPS está activado.
          </Text>
        )}
      </View>

      {estado === "denegado" ? (
        <TouchableOpacity style={estilos.boton} onPress={abrirAjustes}>
          <Text style={estilos.textoBoton}>Abrir ajustes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={estilos.boton} onPress={abrirEnMapas}>
          <Text style={estilos.textoBoton}>Cómo llegar</Text>
        </TouchableOpacity>
      )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}