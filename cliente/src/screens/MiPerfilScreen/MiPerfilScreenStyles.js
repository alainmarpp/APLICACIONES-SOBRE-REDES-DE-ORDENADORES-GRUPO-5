import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F8F5F0",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#40382F",
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 16,
    marginBottom: 25,
  },
  etiqueta: {
    fontSize: 15,
    color: "#776B5D",
    marginBottom: 5,
  },
  valor: {
    fontSize: 19,
    fontWeight: "600",
    color: "#40382F",
    marginBottom: 22,
  },
  texto: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  error: {
    fontSize: 15,
    color: "#B3261E",
    textAlign: "center",
    marginBottom: 25,
  },
  boton: {
    backgroundColor: "#D8D0C4",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  textoBoton: {
    color: "#40382F",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default estilos;