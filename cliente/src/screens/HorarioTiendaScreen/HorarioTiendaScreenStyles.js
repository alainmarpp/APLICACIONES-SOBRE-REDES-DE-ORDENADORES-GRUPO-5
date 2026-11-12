import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#FDF7F9" },
  contenido: { padding: 20, paddingBottom: 40, width: "100%", maxWidth: 500, alignSelf: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#8E3E63", textAlign: "center", marginBottom: 16 },

  cajaTexto: { backgroundColor: "#EADAE4", borderRadius: 14, padding: 14, marginBottom: 20, alignItems: "center" },
  etiquetaTexto: { fontSize: 12, color: "#8E3E63", marginBottom: 4 },
  texto: { fontSize: 16, color: "#4A2C3B", fontWeight: "600", textAlign: "center" },

  seccion: { fontSize: 15, fontWeight: "bold", color: "#4A2C3B", marginBottom: 6, marginTop: 8 },
  fila: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  campo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8C3CF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#4A2C3B",
  },
  guion: { marginHorizontal: 10, color: "#6B5360", fontSize: 16 },

  nota: { fontSize: 12, color: "#9A7B8C", marginTop: 10, lineHeight: 17 },

  botonGuardar: { backgroundColor: "#8E3E63", borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 20 },
  textoGuardar: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  botonVolver: { alignItems: "center", paddingVertical: 14 },
  textoVolver: { color: "#6B5360", fontSize: 15 },
});
