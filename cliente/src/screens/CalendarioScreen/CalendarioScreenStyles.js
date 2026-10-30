import { Dimensions, Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 10,
  elevation: 3,
};

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  areaSegura: { flex: 1, backgroundColor: "#FDF7F9" },

  contenedor: { flex: 1, paddingHorizontal: 20 },

  contenedorContenido: {
    paddingTop: 80,
    paddingBottom: 40,
  },

  tituloCabecera: {
    fontFamily: fuente,
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8E3E63",
    letterSpacing: 1,
    marginBottom: 20,
    textAlign: "center",
  },

  subtitulo: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8E3E63",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 10,
  },

  tituloSeccion: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D2232",
    marginTop: 20,
    marginBottom: 10,
  },

  cabeceraMes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  textoMes: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8E3E63",
  },

  botonNavegacion: { padding: 10 },

  textoBotonNavegacion: {
    fontSize: 20,
    color: "#8E3E63",
    fontWeight: "bold",
  },

  contenedorDiasSemana: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  textoDiaSemana: {
    width: width / 9,
    textAlign: "center",
    color: "#8E3E63",
    opacity: 0.7,
    fontWeight: "600",
  },

  rejillaDias: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  botonDia: {
    width: width / 9,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 20,
  },

  botonDiaSeleccionado: {
    backgroundColor: "#8E3E63",
    ...suave,
  },

  textoDia: { fontSize: 16, color: "#3D2232" },

  textoDiaSeleccionado: { color: "#FFFFFF", fontWeight: "bold" },

  textoDiaDeshabilitado: { color: "#D2C5CE" },

  rejillaHoras: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  botonHora: {
    width: "23%",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EADAE4",
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 10,
    ...suave,
  },

  // Hora seleccionada: Fondo Burdeos elegante
  botonHoraSeleccionado: {
    backgroundColor: "#8E3E63",
    borderColor: "#8E3E63",
  },

  textoHora: { color: "#3D2232", fontSize: 14, fontWeight: "500" },

  // Texto blanco con buen contraste sobre el burdeos
  textoHoraSeleccionado: { color: "#FFFFFF", fontWeight: "bold" },

  botonConfirmar: {
    backgroundColor: "#8E3E63",
    paddingVertical: 16,
    borderRadius: 26,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },

  botonConfirmarDeshabilitado: {
    backgroundColor: "#EADAE4",
    shadowOpacity: 0,
    elevation: 0,
  },

  textoBotonConfirmar: {
    color: "#FFFFFF",
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },

  botonHoraDeshabilitado: {
    backgroundColor: "#F7EEF3",
    borderColor: "#F7EEF3",
    shadowOpacity: 0,
    elevation: 0,
  },

  textoHoraInactiva: { color: "#D2C5CE" },

  textoHoraDeshabilitado: {
    color: "#D2C5CE",
    textDecorationLine: "line-through",
  },
});