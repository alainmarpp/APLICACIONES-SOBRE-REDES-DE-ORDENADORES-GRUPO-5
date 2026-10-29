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
  contenido: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 40,
  },

  cuerpo: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    justifyContent: "center",
  },

  title: { ...tituloBase, fontSize: 34, textAlign: "center", marginBottom: 24 },

  tarjeta: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 28,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#EADAE4",
    ...suave,
  },

  label: {
    fontFamily: fuente,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#8E3E63",
    marginTop: 12,
    marginBottom: 4,
  },

  value: { fontSize: 16, color: "#3D2232", lineHeight: 23, flexShrink: 1 },

  listaAnimales: { marginTop: 8, gap: 10 },

  animal: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#FDF7F9",
    borderWidth: 1,
    borderColor: "#EADAE4",
  },

  animalSeleccionado: {
    backgroundColor: "#8E3E63",
    borderColor: "#8E3E63",
    ...suave,
  },

  textoAnimal: {
    fontFamily: fuente,
    fontSize: 16,
    color: "#3D2232",
    fontWeight: "bold",
  },

  textoAnimalSeleccionado: {
    fontFamily: fuente,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  aviso: { fontSize: 14, color: "#8E3E63", opacity: 0.8, marginTop: 8, lineHeight: 21 },

  // Botón Principal (Confirmar Cita) - Burdeos macizo
  button: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: "#8E3E63",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 10,
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.25,
  },

  // Botón Secundario (Cancelar / Volver) - Estilo elegante Outline
  buttonSecondary: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 26,
    backgroundColor: "#7995c8",
    borderWidth: 1.5,
    borderColor: "#8E3E63",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    ...suave,
    shadowOpacity: 0.05,
  },

  buttonText: {
    fontFamily: fuente,
    fontSize: 17,
    fontWeight: "bold",
    color: "#f8f0f0",
    textAlign: "center",
    letterSpacing: 0.8,
  },

  buttonSecondaryText: {
    fontFamily: fuente,
    fontSize: 16,
    fontWeight: "bold",
    color: "#8E3E63", // Contraste perfecto en burdeos
    textAlign: "center",
    letterSpacing: 0.8,
  },

  botonDeshabilitado: { opacity: 0.5 },
});