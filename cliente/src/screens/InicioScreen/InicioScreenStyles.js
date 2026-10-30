
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
    backgroundColor: "#FDF7F9",
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
    paddingTop: 45,
    paddingBottom: 60,
  },

  cabecera: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 30,
  },

  cuerpo: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },

  botonPerfil: {
    backgroundColor: "#EADAE4",
    paddingVertical: 14,
    paddingHorizontal: 22,
    minHeight: 48,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#7d3d5b",
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

  botonRosa: {
    backgroundColor: "#8E3E63",
  },

  botonLila: {
    backgroundColor: "#8E3E63",
  },

  botonMenta: {
    backgroundColor: "#8E3E63",
  },

  botonMelocoton: {
    backgroundColor: "#8E3E63",
  },

  botonCielo: {
    backgroundColor: "#8E3E63",
  },

  textoBoton: {
    fontFamily: fuenteElegante,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D2232",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  textoBotonPrincipal: {
    fontFamily: fuenteElegante,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textAlign: "center",
  },

  botonSalir: {
    width: "100%",
    minHeight: 56,
    paddingVertical: 12,
    backgroundColor: "#F7EEF3",
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
