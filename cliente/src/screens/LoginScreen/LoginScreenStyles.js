import { Platform, StyleSheet } from "react-native";

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const suave = {
  shadowColor: "#8E3E63",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 3,
};

const tituloBase = {
  fontFamily: fuente,
  fontWeight: "bold",
  fontStyle: "italic",
  color: "#A8537A",
  letterSpacing: 1,
  textShadowColor: "#FFFFFF",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
};

const campo = {
  width: "80%",
  height: 52,
  borderRadius: 26,
  paddingHorizontal: 20,
  fontSize: 16,
  color: "#3D2232", 
  backgroundColor: "#FFFFFF",
  ...suave,
  shadowOpacity: 0.1,
  elevation: 2,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FDF7F9", 
  },
  title: { ...tituloBase, fontSize: 38, marginBottom: 12, textAlign: "center" },
  welcome: {
    fontFamily: fuente,
    fontSize: 19,
    fontStyle: "italic",
    color: "#8A697A", 
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    width: "80%",
    fontFamily: fuente,
    fontSize: 16,
    fontWeight: "bold",
    color: "#3D2232",
    marginBottom: 6,
    marginTop: 10,
  },
  input: { ...campo },
  button: {
    width: "80%",
    padding: 16,
    marginTop: 28,
    borderRadius: 26,
    backgroundColor: "#8E3E63", 
    alignItems: "center",
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontFamily: fuente,
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  registerText: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8A697A",
    marginTop: 25,
    marginBottom: 6,
  },
  registerButton: { padding: 8 },
  registerButtonText: {
    fontFamily: fuente,
    fontSize: 16,
    fontWeight: "bold",
    color: "#A8537A",
    textDecorationLine: "underline",
  },
});