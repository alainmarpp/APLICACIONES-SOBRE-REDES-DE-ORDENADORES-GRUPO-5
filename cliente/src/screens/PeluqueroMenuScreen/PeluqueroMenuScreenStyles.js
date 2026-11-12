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
  contenido: { padding: 24, paddingBottom: 40, width: "100%", maxWidth: 500, alignSelf: "center" },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#8E3E63", textAlign: "center", marginTop: 8 },
  saludo: { fontSize: 15, color: "#6B5360", textAlign: "center", marginTop: 4, marginBottom: 16 },

  resumen: { alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 16, paddingVertical: 14, marginBottom: 20, ...suave },
  resumenNumero: { fontSize: 36, fontWeight: "bold", color: "#8E3E63" },
  resumenTexto: { fontSize: 14, color: "#6B5360" },

  boton: { borderRadius: 16, paddingVertical: 18, paddingHorizontal: 20, marginBottom: 14, ...suave },
  botonRosa: { backgroundColor: "#F6D5E3" },
  botonLila: { backgroundColor: "#E3D9F3" },
  botonMenta: { backgroundColor: "#D3EEE3" },
  textoBoton: { fontSize: 18, fontWeight: "bold", color: "#4A2C3B" },
  subtextoBoton: { fontSize: 13, color: "#6B5360", marginTop: 2 },

  botonSalir: { marginTop: 18, alignItems: "center", paddingVertical: 12 },
  textoSalir: { color: "#6B5360", fontSize: 15 },
});
