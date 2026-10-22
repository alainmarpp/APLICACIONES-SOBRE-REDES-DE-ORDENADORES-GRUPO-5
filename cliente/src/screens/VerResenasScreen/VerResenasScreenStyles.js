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
    alignItems: "center",
  },

  mensaje: {
    fontSize: 17,
    color: "#6B6259",
    textAlign: "center",
    lineHeight: 25,
    marginTop: 20,
  },

  listaContenedor: {
    paddingHorizontal: 10,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    paddingBottom: 20,
  },

  tarjetaResena: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E1DA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },

  usuarioResena: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#161411",
    marginBottom: 8,
  },

  puntuacionResena: {
    fontSize: 16, 
    marginBottom: 8,
  },

  comentarioResena: {
    fontSize: 16,
    color: "#554D44",
    lineHeight: 24,
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