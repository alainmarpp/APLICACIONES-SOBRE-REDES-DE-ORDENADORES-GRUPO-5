import { Platform, StyleSheet } from "react-native";

const colores = {
  fondo: "#FDF7F9",
  principal: "#8E3E63",
  titulo: "#A8537A",
  textoSuave: "#8A697A",
  textoOscuro: "#3D2232",
  blanco: "#FFFFFF",
};

const RADIO_BORDE = 26;

const fuente = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "Georgia, 'Times New Roman', serif",
});

const sombraSuave = {
  shadowColor: colores.principal,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 3,
};

export default StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },

  contenido: { flexGrow: 1, padding: 25, paddingBottom: 40 },

  cuerpo: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontFamily: fuente,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colores.titulo,
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitulo: {
    fontFamily: fuente,
    fontSize: 17,
    fontStyle: "italic",
    color: colores.textoSuave,
    letterSpacing: 0.6,
    marginBottom: 25,
    textAlign: "center",
  },

  contenedorMapa: {
    width: "100%",
    borderRadius: RADIO_BORDE,
    borderWidth: 4,
    borderColor: colores.blanco,
    overflow: "hidden",
    marginBottom: 18,
    ...sombraSuave,
  },

  mapa: { width: "100%", height: "100%" },

  tarjeta: {
    width: "100%",
    minHeight: 65,
    backgroundColor: colores.blanco,
    borderRadius: RADIO_BORDE,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 18,
    ...sombraSuave,
  },

  textoTarjeta: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colores.textoOscuro,
    textAlign: "center",
  },

  textoSecundario: {
    fontSize: 14,
    color: colores.textoSuave,
    marginTop: 4,
    textAlign: "center",
  },

  boton: {
    width: "100%",
    minHeight: 60,
    paddingVertical: 12,
    backgroundColor: colores.principal,
    borderRadius: RADIO_BORDE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    ...sombraSuave,
    shadowOpacity: 0.3,
  },

  textoBoton: {
    fontFamily: fuente,
    fontSize: 18,
    fontWeight: "bold",
    color: colores.blanco,
    letterSpacing: 0.8,
    textAlign: "center",
  },
});