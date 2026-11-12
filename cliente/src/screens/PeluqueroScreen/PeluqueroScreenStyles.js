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

  selectorDia: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  flecha: { backgroundColor: "#EADAE4", width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  textoFlecha: { fontSize: 20, fontWeight: "bold", color: "#8E3E63" },
  fechaCaja: { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  fecha: { fontSize: 17, fontWeight: "bold", color: "#4A2C3B", textTransform: "capitalize" },
  pistaHoy: { fontSize: 11, color: "#9A7B8C" },

  total: { textAlign: "center", color: "#6B5360", fontSize: 14, marginBottom: 10 },
  aviso: { textAlign: "center", color: "#6B5360", marginVertical: 24, fontSize: 16 },
  error: { textAlign: "center", color: "#C0392B", marginVertical: 16, fontSize: 15 },

  tarjeta: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 12, ...suave },
  hora: { fontSize: 18, fontWeight: "bold", color: "#8E3E63", marginBottom: 4 },
  perro: { fontSize: 16, fontWeight: "600", color: "#4A2C3B", marginBottom: 4 },
  detalle: { fontSize: 14, color: "#6B5360", marginBottom: 2 },
  botonCancelar: { marginTop: 10, alignSelf: "flex-start", borderWidth: 1, borderColor: "#C0392B", borderRadius: 10, paddingVertical: 6, paddingHorizontal: 12 },
  textoCancelar: { color: "#C0392B", fontWeight: "600" },

  botonPrincipal: { backgroundColor: "#8E3E63", borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 20, ...suave },
  textoPrincipal: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  botonSecundario: { alignSelf: "center", backgroundColor: "#EADAE4", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  textoSecundario: { color: "#8E3E63", fontWeight: "600" },
  botonSalir: { marginTop: 14, alignItems: "center", paddingVertical: 12 },
  textoSalir: { color: "#6B5360", fontSize: 15 },
});
