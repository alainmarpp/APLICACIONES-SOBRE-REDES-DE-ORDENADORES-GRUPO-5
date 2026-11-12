import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { peticion } from "../services/api";

// Texto fijo con el horario de la tienda (lo cambia el peluquero desde su vista).
export default function HorarioTienda({ estiloContenedor }) {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    let activo = true;
    peticion("/horario")
      .then((datos) => activo && setTexto(datos?.texto || ""))
      .catch(() => {
        // sin conexión: simplemente no se enseña
      });
    return () => {
      activo = false;
    };
  }, []);

  if (!texto) return null;

  return (
    <View style={[estilos.caja, estiloContenedor]}>
      <Text style={estilos.titulo}>🕒 Horario de la tienda</Text>
      <Text style={estilos.texto}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    backgroundColor: "#EADAE4",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 18,
    alignSelf: "stretch",
    alignItems: "center",
  },
  titulo: { fontWeight: "bold", color: "#8E3E63", marginBottom: 4, fontSize: 15 },
  texto: { color: "#5A3A4A", fontSize: 14, textAlign: "center" },
});
