import { Platform, StyleSheet } from "react-native";

const fuenteElegante = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 3,
};

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#FDF7F9", // Fondo suave neutro/rosa empolvado
  },

  estampado: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },

  adorno: {
    position: "absolute",
  },

  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },

  contenido: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40,
  },

  cabecera: {
    width: "100%",
    alignItems: "flex-end",
  },

  cuerpo: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  botonPerfil: {
    backgroundColor: "#EADAE4", // Rosa empolvado suave
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 22,
    ...suave,
  },

  textoPerfil: {
    color: "#3D2232",
    fontFamily: fuenteElegante,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  titulo: {
    fontFamily: fuenteElegante,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#7d3d5b", // Burdeos medio elegante
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitulo: {
    fontFamily: fuenteElegante,
    fontSize: 17,
    fontStyle: "italic",
    color: "#8A697A",
    letterSpacing: 0.6,
    marginBottom: 28,
    textAlign: "center",
  },

  // Base de botones con paleta coordinada desaturada
  boton: {
    width: "100%",
    minHeight: 62,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    ...suave,
  },

  // Variaciones de botones pasteles empolvados (chic y elegantes)
  botonRosa: { backgroundColor: "#8E3E63" }, // Botón principal burdeos chic
  botonLila: { backgroundColor: "#8E3E63" }, // Rosa lavanda empolvado
  botonMenta: { backgroundColor: "#8E3E63" }, // Menta desaturado
  botonMelocoton: { backgroundColor: "#8E3E63" }, // Melocotón nude
  botonCielo: { backgroundColor: "#8E3E63" }, // Azul empolvado

  textoBoton: {
    fontFamily: fuenteElegante,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D2232", // Texto berenjena/burdeos oscuro muy legible
    letterSpacing: 0.8,
    textAlign: "center",
  },

  textoBotonPrincipal: {
    fontFamily: fuenteElegante,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Texto blanco para el botón burdeos principal
    letterSpacing: 0.8,
    textAlign: "center",
  },

  botonSalir: {
    width: "100%",
    minHeight: 56,
    paddingVertical: 12,
    backgroundColor: "#F7EEF3", // Muy suave para no destacar tanto como acción principal
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    ...suave,
    shadowOpacity: 0.08,
  },

  textoBotonSalir: {
    fontFamily: fuenteElegante,
    fontSize: 16,
    fontWeight: "bold",
    color: "#A8537A",
    letterSpacing: 0.8,
    textAlign: "center",
  },
});