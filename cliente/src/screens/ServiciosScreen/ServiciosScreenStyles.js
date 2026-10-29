import { Platform, StyleSheet } from "react-native";

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

const tituloBase = {
  fontFamily: fuente,
  fontWeight: "bold",
  fontStyle: "italic",
  color: "#8E3E63",
  letterSpacing: 1,
};

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#FDF7F9" },

  estampado: { ...StyleSheet.absoluteFillObject, opacity: 0.15 },
  adorno: { position: "absolute" },

  lista: { flex: 1 },

  contenidoLista: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  cabecera: { alignItems: "center" },

  bienvenida: {
    fontFamily: fuente,
    fontSize: 17,
    fontStyle: "italic",
    color: "#8E3E63",
    opacity: 0.8,
    marginTop: 20,
    marginBottom: 4,
    textAlign: "center",
  },

  titulo: { ...tituloBase, fontSize: 34, marginTop: 4, marginBottom: 4 },

  lema: {
    fontFamily: fuente,
    fontSize: 12,
    fontStyle: "italic",
    color: "#8E3E63",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
    textAlign: "center",
    opacity: 0.85,
  },

  subtitulo: {
    fontFamily: fuente,
    fontSize: 15,
    color: "#3D2232",
    marginBottom: 22,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  textoVacio: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8E3E63",
    opacity: 0.7,
    textAlign: "center",
    marginTop: 20,
  },

  itemServicio: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 24,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EADAE4",
    ...suave,
  },

  // Unificación duocroma: todas las variantes comparten la base sobria
  servicioRosa: { backgroundColor: "#FFFFFF" },
  servicioLila: { backgroundColor: "#FFFFFF" },
  servicioMenta: { backgroundColor: "#FFFFFF" },
  servicioMelocoton: { backgroundColor: "#FFFFFF" },
  servicioCielo: { backgroundColor: "#FFFFFF" },

  itemServicioSeleccionado: {
    backgroundColor: "#8E3E63",
    borderColor: "#8E3E63",
    shadowColor: "#8E3E63",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  emojiServicio: { fontSize: 24, marginRight: 14 },

  textoServicio: {
    flex: 1,
    fontFamily: fuente,
    fontSize: 16,
    fontWeight: "bold",
    color: "#3D2232",
    letterSpacing: 0.5,
  },

  textoServicioSeleccionado: { color: "#FFFFFF" },

  circulo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FDF7F9",
    borderWidth: 1,
    borderColor: "#EADAE4",
    alignItems: "center",
    justifyContent: "center",
  },

  circuloSeleccionado: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },

  check: { fontSize: 15, fontWeight: "bold", color: "#8E3E63" },

  pie: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "rgba(253, 247, 249, 0.95)",
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
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
});