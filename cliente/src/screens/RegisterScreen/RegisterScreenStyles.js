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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FDF7F9",
  },

  title: {
    ...tituloBase,
    fontSize: 34,
    textAlign: "center",
    marginBottom: 20,
  },

  subtitle: {
    fontFamily: fuente,
    fontSize: 15,
    fontStyle: "italic",
    color: "#8E3E63",
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    width: "85%",
    fontFamily: fuente,
    fontSize: 15,
    fontWeight: "bold",
    color: "#3D2232",
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    width: "85%",
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#3D2232",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EADAE4",
    ...suave,
  },

  button: {
    width: "85%",
    paddingVertical: 16,
    marginTop: 28,
    borderRadius: 26,
    backgroundColor: "#8E3E63",
    alignItems: "center",
    justifyContent: "center",
    ...suave,
    shadowColor: "#8E3E63",
    shadowOpacity: 0.3,
  },

  buttonText: {
    fontFamily: fuente,
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
});