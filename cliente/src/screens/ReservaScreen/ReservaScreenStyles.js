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

  button: {
    width: "80%",
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: "#D8D0C4",
    alignItems: "center",
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