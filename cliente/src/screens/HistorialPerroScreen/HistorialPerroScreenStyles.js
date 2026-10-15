import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  historial: {
    width: "90%",
    minHeight: 100,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 40,
  },

  boton: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
  },

  textoBoton: {
    fontSize: 18,
    fontWeight: "bold",
  },
});