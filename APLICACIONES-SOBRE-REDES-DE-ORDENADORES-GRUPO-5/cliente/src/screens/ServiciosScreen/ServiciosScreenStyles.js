import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  bienvenida: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  lista: {
    width: "100%",
    marginBottom: 20,
  },

  itemServicio: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },

  itemServicioSeleccionado: {
    backgroundColor: "#D8D0C4",
    borderColor: "#D8D0C4",
  },

  textoServicio: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },

  textoServicioSeleccionado: {
    color: "#000000",
  },

  boton: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
    marginBottom: 30,
  },

  textoBoton: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
