import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#FAF8F5",
    padding: 24,
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#161411",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 12,
  },

  subtitulo: {
    fontSize: 17,
    color: "#6B6259",
    textAlign: "center",
    marginBottom: 30,
  },

  etiqueta: {
    width: "100%",
    fontSize: 17,
    fontWeight: "bold",
    color: "#3D352E",
    marginBottom: 12,
  },

  estrellas: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 30,
  },

  estrella: {
    fontSize: 42,
    color: "#B18A45",
  },

  campoComentario: {
    width: "100%",
    minHeight: 150,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D8D0C4",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333333",
    marginBottom: 20,
  },

  boton: {
    width: "100%",
    padding: 15,
    marginTop: 10,
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

  botonVolver: {
    width: "100%",
    padding: 15,
    marginTop: 10,
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
