import { Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 3,
};

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#FDF7F9" },

  contenidoLista: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingBottom: 20,
  },

  pie: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "rgba(253, 247, 249, 0.95)",
  },

  titulo: {
    fontFamily: fuente,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#A8537A",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#FFFFFF",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },

  lista: { flex: 1, width: "100%" },

  tarjetaReserva: {
    width: "100%",
    padding: 18,
    marginBottom: 16,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    ...suave,
  },

  nombreAnimal: {
    fontFamily: fuente,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#A8537A",
    marginBottom: 12,
  },

  detalle: { fontSize: 15, marginBottom: 8, color: "#3D2232" },

  etiquetaServicios: {
    fontFamily: fuente,
    fontSize: 15,
    fontWeight: "bold",
    color: "#3D2232",
    marginTop: 5,
    marginBottom: 5,
  },

  historial: {
    width: "100%",
    padding: 20,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    color: "#3D2232",
    marginBottom: 20,
    ...suave,
  },

  estado: {
    flex: 1,
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  mensaje: {
    fontFamily: fuente,
    fontSize: 16,
    fontStyle: "italic",
    color: "#8A697A",
    textAlign: "center",
    marginTop: 12,
  },

  mensajeError: {
    fontSize: 15,
    color: "#A8537A",
    textAlign: "center",
    marginVertical: 20,
  },

  boton: {
    width: "100%",
    padding: 16,
    borderRadius: 26,
    backgroundColor: "#8E3E63",
    alignItems: "center",
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },

  textoBoton: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },

  contenedorBotones: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
    width: "100%",
  },

  botonModificar: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "#EADAE4",
    alignItems: "center",
    justifyContent: "center",
    ...suave,
  },

  textoBotonModificar: {
    color: "#3D2232",
    fontFamily: fuente,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  botonEliminar: {
    flex: 1,
    minWidth: 0,
    marginTop: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: "#EADAE4",
    alignItems: "center",
    justifyContent: "center",
    ...suave,
  },

  textoBotonEliminar: {
    color: "#3D2232",
    fontFamily: fuente,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  botonVolver: {
    width: "100%",
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 26,
    backgroundColor: "#EADAE4",
    alignItems: "center",
    ...suave,
  },

  textoBotonVolver: {
    fontFamily: fuente,
    fontSize: 17,
    fontWeight: "bold",
    color: "#3D2232",
    letterSpacing: 0.8,
  },
});