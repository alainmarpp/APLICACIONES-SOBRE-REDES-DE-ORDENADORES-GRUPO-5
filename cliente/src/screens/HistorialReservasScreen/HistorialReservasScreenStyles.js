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
    marginTop: 25,
    marginBottom: 25,
    textAlign: "center",
  },

  lista: {
    flex: 1,
    width: "100%",
  },

  tarjetaReserva: {
    width: "100%",
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },

  nombreAnimal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  detalle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444444",
  },

  etiquetaServicios: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },

  historial: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    borderRadius: 15,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },

  estado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  mensaje: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },

  mensajeError: {
    fontSize: 16,
    color: "#B00020",
    textAlign: "center",
    marginVertical: 20,
  },

  boton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },

  textoBoton: {
    fontSize: 18,
    fontWeight: "bold",
  },

  botonEliminar: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ffcdd2",
    alignItems: "center",
  },

  textoBotonEliminar: {
    color: "#c62828",
    fontSize: 15,
    fontWeight: "bold",
  },
});