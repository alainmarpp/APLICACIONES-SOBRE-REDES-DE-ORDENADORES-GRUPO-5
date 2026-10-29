import { Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
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

const tituloBase = {
  fontFamily: fuente,
  fontWeight: "bold",
  fontStyle: "italic",
  color: "#A8537A",
  letterSpacing: 1,
  textShadowColor: "#FFFFFF",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FDF7F9",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  titulo: { ...tituloBase, fontSize: 34, marginBottom: 8, textAlign: "center" },
  subtitulo: {
    fontFamily: fuente,
    fontSize: 16,
    fontStyle: "italic",
    color: "#8A697A",
    marginBottom: 30,
    textAlign: "center",
  },
  boton: {
    width: "100%",
    padding: 16,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 26,
    backgroundColor: "#8E3E63",
    alignItems: "center",
    justifyContent: "center",
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },
  textoBoton: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  botonVolver: {
    width: "100%",
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 26,
    backgroundColor: "#EADAE4",
    alignItems: "center",
    ...suave,
  },
  textoBotonVolver: {
    fontFamily: fuente,
    fontSize: 17,
    fontWeight: "bold",
    color: "#3D2232",
    letterSpacing: 0.8,
  },
});

export default estilos;