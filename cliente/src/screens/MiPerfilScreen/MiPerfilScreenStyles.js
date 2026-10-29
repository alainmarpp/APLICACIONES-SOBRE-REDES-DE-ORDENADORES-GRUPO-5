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

const campo = {
  width: "80%",
  height: 52,
  borderRadius: 26,
  paddingHorizontal: 20,
  fontSize: 16,
  color: "#3D2232",
  backgroundColor: "#FFFFFF",
  ...suave,
  shadowOpacity: 0.1,
  elevation: 2,
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FDF7F9",
  },
  titulo: { ...tituloBase, fontSize: 34, textAlign: "center", marginBottom: 30 },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 28,
    marginBottom: 25,
    ...suave,
  },
  etiqueta: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8A697A",
    marginBottom: 5,
  },
  valor: {
    fontFamily: fuente,
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D2232",
    marginBottom: 22,
  },
  texto: {
    fontSize: 16,
    color: "#3D2232",
    textAlign: "center",
    marginBottom: 25,
  },
  error: {
    fontSize: 15,
    color: "#A8537A",
    textAlign: "center",
    marginBottom: 25,
  },
  boton: {
    backgroundColor: "#8E3E63",
    padding: 16,
    borderRadius: 26,
    alignItems: "center",
    marginBottom: 15,
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },
  textoBoton: {
    fontFamily: fuente,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  botonSalir: {
    backgroundColor: "#F7EEF3",
    padding: 16,
    borderRadius: 26,
    alignItems: "center",
    ...suave,
    shadowOpacity: 0.08,
  },
  textoBotonSalir: {
    fontFamily: fuente,
    color: "#A8537A",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
});

export default estilos;