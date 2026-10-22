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
    marginBottom: 10,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 25,
    textAlign: "center",
  },

  contenedorMapa: {
    width: "90%",
    height: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    overflow: "hidden",
    marginBottom: 18,
  },

  mapa: {
    width: "100%",
    height: "100%",
  },

  // Marcadores
  marcador: {
    alignItems: "center",
  },

  emojiMarcador: {
    fontSize: 24,
  },

  etiquetaTienda: {
    backgroundColor: "#40382F",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },

  textoEtiquetaTienda: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  burbujaTienda: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#40382F",
    alignItems: "center",
    justifyContent: "center",
  },

  puntaTienda: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#40382F",
  },

  etiquetaUsuario: {
    backgroundColor: "#2F80ED",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 4,
  },

  textoEtiquetaUsuario: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  burbujaUsuario: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#2F80ED",
    alignItems: "center",
    justifyContent: "center",
  },

  puntaUsuario: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#2F80ED",
  },

  // Cartel de distancia sobre el mapa
  cartelDistancia: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  textoCartel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#40382F",
  },

  tarjeta: {
    width: "90%",
    minHeight: 65,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  textoTarjeta: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },

  textoSecundario: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
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
});