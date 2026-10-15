import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    width: "80%",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  value: {
    width: "80%",
    fontSize: 18,
    marginBottom: 10,
  },

  aviso: {
    width: "80%",
    fontSize: 16,
    marginBottom: 5,
  },

  listaAnimales: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  animal: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    backgroundColor: "#ffffff",
  },

  animalSeleccionado: {
    backgroundColor: "#D8D0C4",
  },

  textoAnimal: {
    fontSize: 16,
  },

  button: {
    width: "80%",
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
  },

  botonDeshabilitado: {
    opacity: 0.6,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonSecondary: {
    width: "80%",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8D0C4",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});
