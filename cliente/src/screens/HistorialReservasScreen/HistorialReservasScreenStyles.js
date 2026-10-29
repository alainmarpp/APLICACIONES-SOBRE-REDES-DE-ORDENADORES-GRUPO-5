import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  contenidoLista: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingBottom: 20,
  },

  // Zona fija inferior: el botón siempre está visible
  pie: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#E5DFD5",
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
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
    minHeight: 150,
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
  },

  textoBoton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },

  // Contenedor horizontal para los dos botones
  contenedorBotones: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
    width: "100%",
  },

  // Botón Modificar reserva
  botonModificar: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotonModificar: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Botón Eliminar reserva
  botonEliminar: {
    flex: 1,
    minWidth: 0,
    marginTop: 0,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ffcdd2",
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotonEliminar: {
    color: "#c62828",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});