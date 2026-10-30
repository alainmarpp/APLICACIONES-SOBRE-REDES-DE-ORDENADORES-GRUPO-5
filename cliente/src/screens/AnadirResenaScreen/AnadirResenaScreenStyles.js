
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

const estilos = StyleSheet.create({
    pantalla: {
        flex: 1,
        backgroundColor: "#FDF7F9",
    },

    contenedorTeclado: {
        flex: 1,
        minHeight: 0,
    },

    scroll: {
        flex: 1,
        minHeight: 0,
    },

    contenido: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 120,
        paddingBottom: 100,
        alignItems: "center",
    },

    titulo: {
        fontFamily: fuente,
        fontSize: 32,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "#A8537A",
        letterSpacing: 1,
        textAlign: "center",
        marginBottom: 10,
        textShadowColor: "#FFFFFF",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },

    subtitulo: {
        fontFamily: fuente,
        fontSize: 16,
        fontStyle: "italic",
        color: "#8A697A",
        textAlign: "center",
        marginBottom: 25,
    },

    etiqueta: {
        width: "100%",
        fontFamily: fuente,
        fontSize: 16,
        fontWeight: "bold",
        color: "#3D2232",
        marginBottom: 12,
    },

    estrellas: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 12,
        marginBottom: 25,
    },

    estrella: {
        fontSize: 40,
        color: "#D4A359",
    },

    campoComentario: {
        width: "100%",
        minHeight: 140,
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#EADAE4",
        borderRadius: 22,
        padding: 15,
        fontSize: 16,
        color: "#3D2232",
        marginBottom: 20,
        ...suave,
    },

    boton: {
        width: "100%",
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 26,
        backgroundColor: "#8E3E63",
        alignItems: "center",
        ...suave,
        shadowColor: "#8E3E63",
        shadowOpacity: 0.3,
    },

    textoBoton: {
        fontFamily: fuente,
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: 0.8,
    },

    botonVolver: {
        width: "100%",
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 26,
        backgroundColor: "#EADAE4",
        alignItems: "center",
        ...suave,
    },

    textoBotonVolver: {
        fontFamily: fuente,
        fontSize: 17,
        fontWeight: "bold",
        color: "#3D2232",
        letterSpacing: 0.8,
    },
});

export default estilos;
