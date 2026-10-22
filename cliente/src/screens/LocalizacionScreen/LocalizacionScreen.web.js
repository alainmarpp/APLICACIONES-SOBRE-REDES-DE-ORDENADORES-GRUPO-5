import { Text, TouchableOpacity, View } from "react-native";

import estilos from "./LocalizacionScreenStyles";
import { useLocalizacionScreen } from "./useLocalizacionScreen";

export default function LocalizacionScreen() {
  const { tienda, abrirEnMapas } = useLocalizacionScreen();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Localización</Text>

      <Text style={estilos.subtitulo}>Encuentra nuestra tienda</Text>

      <View style={estilos.tarjeta}>
        <Text style={estilos.textoTarjeta}>{tienda.nombre}</Text>
        <Text style={estilos.textoSecundario}>
          El mapa solo está disponible en la app móvil.
        </Text>
      </View>

      <TouchableOpacity style={estilos.boton} onPress={abrirEnMapas}>
        <Text style={estilos.textoBoton}>Abrir en Maps</Text>
      </TouchableOpacity>
    </View>
  );
}