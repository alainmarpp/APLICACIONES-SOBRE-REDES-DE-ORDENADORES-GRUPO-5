
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
    backgroundColor: "#FDF7F9",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 140,
    paddingBottom: 10,
  },
  titulo: {
    ...tituloBase,
    fontSize: 34,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 20,
  },
  contenido: {
    flex: 1,
    minHeight: 0,
    width: "100%",
    alignItems: "center",
  },
  mensaje: {
    fontFamily: fuente,
    fontSize: 16,
    fontStyle: "italic",
    color: "#8A697A",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 20,
  },
  listaContenedor: {
    paddingHorizontal: 10,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingBottom: 20,
  },
  tarjetaResena: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    marginVertical: 10,
    borderRadius: 26,
    width: "100%",
    ...suave,
  },
  usuarioResena: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#A8537A",
    marginBottom: 6,
  },
  puntuacionResena: {
    fontSize: 16,
    color: "#D4A359",
    marginBottom: 8,
  },
  comentarioResena: {
    fontSize: 15,
    color: "#3D2232",
    lineHeight: 22,
  },
  botonVolver: {
    width: "100%",
    padding: 16,
    marginTop: 15,
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
