import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  botonPerfil: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: "#D8D0C4",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  textoPerfil: {
    color: "#40382F",
    fontSize: 12,
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
    marginBottom: 35,
    textAlign: "center",
  },

  boton: {
    width: "90%",
    height: 65,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  textoBoton: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333333",
  },

  botonSalir: {
    width: "90%",
    height: 65,
    backgroundColor: "#ff3b30",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  textoBotonSalir: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#ffffff",
  },
});