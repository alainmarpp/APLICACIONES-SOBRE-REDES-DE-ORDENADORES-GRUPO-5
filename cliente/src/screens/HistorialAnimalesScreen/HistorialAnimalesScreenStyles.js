import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  lista: {
    flex: 1,
    width: "100%",
  },

  contenidoLista: {
    paddingBottom: 20,
  },

  tarjeta: {
    width: "100%",
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
  },

  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
  },

  dato: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 8,
  },

  mensaje: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 30,
    color: "#555555",
  },

  enlaceRegistro: {
    alignItems: "center",
    padding: 12,
    marginTop: 5,
  },

  textoEnlaceRegistro: {
    fontSize: 16,
    color: "#6B5D4D",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  boton: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
  },

  textoBoton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});