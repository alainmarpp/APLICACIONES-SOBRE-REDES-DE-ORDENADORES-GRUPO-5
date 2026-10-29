import { Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

// Sombra suave en tono burdeos
const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 3,
};

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#FDF7F9" }, // Fondo suave neutro/empolvado

  contenido: { flexGrow: 1, padding: 25, paddingBottom: 40 },

  cuerpo: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontFamily: fuente,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#A8537A", // Burdeos medio sofisticado
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitulo: {
    fontFamily: fuente,
    fontSize: 17,
    fontStyle: "italic",
    color: "#8A697A", // Tono neutro rosado
    letterSpacing: 0.6,
    marginBottom: 25,
    textAlign: "center",
  },

  // Marco blanco alrededor del mapa
  contenedorMapa: {
    width: "100%",
    borderRadius: 26,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: 18,
    ...suave,
  },

  mapa: { width: "100%", height: "100%" },

  // Marcadores
  marcador: { alignItems: "center" },

  emojiMarcador: { fontSize: 24 },

  etiquetaTienda: {
    backgroundColor: "#8E3E63", // Burdeos chic para la tienda
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },

  textoEtiquetaTienda: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  burbujaTienda: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF0F5",
    borderWidth: 3,
    borderColor: "#8E3E63",
    alignItems: "center",
    justifyContent: "center",
  },

  puntaTienda: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#8E3E63",
  },

  etiquetaUsuario: {
    backgroundColor: "#A8537A", // Burdeos claro para el usuario
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 4,
  },

  textoEtiquetaUsuario: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },

  burbujaUsuario: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#A8537A",
    alignItems: "center",
    justifyContent: "center",
  },

  puntaUsuario: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#A8537A",
  },

  // Cartel de distancia sobre el mapa
  cartelDistancia: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    ...suave,
  },

  textoCartel: {
    fontFamily: fuente,
    fontSize: 15,
    fontWeight: "bold",
    color: "#8E3E63",
  },

  tarjeta: {
    width: "100%",
    minHeight: 65,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 18,
    ...suave,
  },

  textoTarjeta: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#3D2232", // Texto berenjena oscuro/legible
    textAlign: "center",
  },

  textoSecundario: {
    fontSize: 14,
    color: "#8A697A",
    marginTop: 4,
    textAlign: "center",
  },

  // Botón de acción principal
  boton: {
    width: "100%",
    minHeight: 60,
    paddingVertical: 12,
    backgroundColor: "#8E3E63", // Burdeos principal
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },

  textoBoton: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Blanco brillante para destacar en el botón burdeos
    letterSpacing: 0.8,
    textAlign: "center",
  },
});