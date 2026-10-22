import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FAF8F5",
    alignItems: "center",
    padding: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#161411",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  contenido: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  mensaje: {
    fontSize: 17,
    color: "#6B6259",
    textAlign: "center",
    lineHeight: 25,
  },

  botonVolver: {
    width: "100%",
    padding: 15,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
  },

  textoBotonVolver: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default estilos;