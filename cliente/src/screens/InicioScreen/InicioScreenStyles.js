import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    backgroundColor: "#D8D0C4",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  textoPerfil: {
    color: "#40382F",
    fontSize: 13,
    fontWeight: "600",
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },

  boton: {
    width: "100%",
    minHeight: 60,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  textoBoton: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },

  botonSalir: {
    width: "100%",
    minHeight: 60,
    paddingVertical: 12,
    backgroundColor: "#ff3b30",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  textoBotonSalir: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});