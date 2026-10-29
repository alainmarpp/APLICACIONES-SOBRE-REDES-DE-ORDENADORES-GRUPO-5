import { Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 10,
  elevation: 3,
};

export default StyleSheet.create({
  pantalla: { 
    flex: 1, 
    backgroundColor: "#FDF7F9" 
  },

  lista: { 
    flex: 1 
  },

  contenidoLista: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },

  titulo: {
    fontFamily: fuente,
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8E3E63",
    letterSpacing: 1,
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },

  tarjeta: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 24,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EADAE4",
    ...suave,
  },

  nombre: {
    fontFamily: fuente,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8E3E63",
    marginBottom: 8,
  },

  dato: {
    fontFamily: fuente,
    fontSize: 15,
    color: "#3D2232",
    lineHeight: 22,
    marginBottom: 2,
  },

  estado: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  mensaje: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8E3E63",
    opacity: 0.8,
    textAlign: "center",
    marginVertical: 30,
  },

  enlaceRegistro: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: 8,
  },

  textoEnlaceRegistro: {
    fontFamily: fuente,
    fontSize: 15,
    fontWeight: "bold",
    color: "#8E3E63",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  pie: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "rgba(253, 247, 249, 0.95)",
  },

  boton: {
    width: "100%",
    paddingVertical: 16,
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
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
    textAlign: "center",
  },
});