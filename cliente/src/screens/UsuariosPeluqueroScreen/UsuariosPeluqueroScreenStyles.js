import { StyleSheet } from "react-native";

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 2,
};

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#FDF7F9" },
  contenido: { padding: 20, paddingBottom: 40, width: "100%", maxWidth: 500, alignSelf: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#8E3E63", textAlign: "center", marginBottom: 16 },
  aviso: { textAlign: "center", color: "#6B5360", marginVertical: 24, fontSize: 16 },
  error: { textAlign: "center", color: "#C0392B", marginVertical: 16, fontSize: 15 },

  tarjeta: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 12, ...suave },
  fila: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  nombre: { flex: 1, fontSize: 17, fontWeight: "bold", color: "#4A2C3B" },
  etiqueta: { borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, marginLeft: 8 },
  etiquetaPeluquero: { backgroundColor: "#D3EEE3" },
  etiquetaCliente: { backgroundColor: "#EADAE4" },
  textoEtiqueta: { fontSize: 12, fontWeight: "600", color: "#4A2C3B" },
  detalle: { fontSize: 14, color: "#6B5360", marginBottom: 2 },

  acciones: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  botonContratar: { backgroundColor: "#8E3E63", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14, marginRight: 8 },
  textoContratar: { color: "#FFFFFF", fontWeight: "600" },
  botonAccion: { backgroundColor: "#EADAE4", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14 },
  textoAccion: { color: "#8E3E63", fontWeight: "600" },
  botonEliminar: { borderWidth: 1, borderColor: "#C0392B", borderRadius: 10, paddingVertical: 7, paddingHorizontal: 14 },
  textoEliminar: { color: "#C0392B", fontWeight: "600" },

  botonSecundario: { alignSelf: "center", backgroundColor: "#EADAE4", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  textoSecundario: { color: "#8E3E63", fontWeight: "600" },
});
