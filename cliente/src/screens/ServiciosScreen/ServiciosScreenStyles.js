import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  lista: {
    flex: 1,
  },

  contenidoLista: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  cabecera: {
    alignItems: "center",
  },

  bienvenida: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
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

  textoVacio: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 20,
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

  // Zona fija inferior: el botón siempre está visible
  pie: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#E5DFD5",
  },

  boton: {
    width: "100%",
    padding: 15,
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