import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./LocalizacionScreenStyles";
import { abrirEnMapas, TIENDA } from "./useLocalizacionScreen";

export default function LocalizacionScreen() {
  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.contenido}>
        <View style={estilos.cuerpo}>
          <Text style={estilos.titulo}>Localización</Text>
          <Text style={estilos.subtitulo}>Encuentra nuestra peluquería</Text>

          <View style={estilos.tarjeta}>
            <Text style={estilos.textoTarjeta}>{TIENDA.nombre}</Text>
            <Text style={estilos.textoSecundario}>
              El mapa solo está disponible en la app móvil.
            </Text>
          </View>

          <TouchableOpacity style={estilos.boton} onPress={abrirEnMapas}>
            <Text style={estilos.textoBoton}>Cómo llegar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}