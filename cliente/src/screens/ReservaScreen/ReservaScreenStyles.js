import { StyleSheet } from "react-native";

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 24,
  },

  tarjeta: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#756B5F",
    marginTop: 12,
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 23,
    flexShrink: 1,
  },

  listaAnimales: {
    marginTop: 8,
    gap: 10,
  },

  animal: {
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    backgroundColor: "#FAF8F5",
  },

  animalSeleccionado: {
    backgroundColor: "#D8D0C4",
    borderColor: "#8A8175",
    borderWidth: 2,
  },

  textoAnimal: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },

  aviso: {
    fontSize: 14,
    color: "#756B5F",
    marginTop: 8,
    lineHeight: 21,
  },

  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 10,
  },

  buttonSecondary: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D0C4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },
});