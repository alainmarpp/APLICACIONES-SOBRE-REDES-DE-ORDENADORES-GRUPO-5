
import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FAF8F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#161411",
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 17,
    color: "#6B6259",
    marginBottom: 30,
    textAlign: "center",
  },


    boton: {
      width: "100%",
      padding: 15,
      marginTop: 15,
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      borderWidth: 1.5,
      borderColor: "#D8D0C4",
      alignItems: "center",
      justifyContent: "center",
    },

    textoBoton: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333333",
      textAlign: "center",
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
