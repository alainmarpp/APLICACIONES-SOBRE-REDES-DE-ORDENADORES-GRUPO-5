import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./HorarioTiendaScreenStyles";
import { useHorarioTiendaScreen } from "./useHorarioTiendaScreen";

export default function HorarioTiendaScreen() {
  const {
    mananaInicio, setMananaInicio,
    mananaFin, setMananaFin,
    tardeInicio, setTardeInicio,
    tardeFin, setTardeFin,
    texto,
    cargando,
    guardando,
    guardar,
    volver,
  } = useHorarioTiendaScreen();

  const campo = (valor, cambiar) => (
    <TextInput
      style={estilos.campo}
      value={valor}
      onChangeText={cambiar}
      placeholder="HH:MM"
      keyboardType="numbers-and-punctuation"
      maxLength={5}
    />
  );

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>🕒 Horario de la tienda</Text>

        <View style={estilos.cajaTexto}>
          <Text style={estilos.etiquetaTexto}>Lo que ven los clientes</Text>
          <Text style={estilos.texto}>{cargando ? "Cargando..." : texto}</Text>
        </View>

        <Text style={estilos.seccion}>Tramo de mañana</Text>
        <View style={estilos.fila}>
          {campo(mananaInicio, setMananaInicio)}
          <Text style={estilos.guion}>a</Text>
          {campo(mananaFin, setMananaFin)}
        </View>

        <Text style={estilos.seccion}>Tramo de tarde</Text>
        <View style={estilos.fila}>
          {campo(tardeInicio, setTardeInicio)}
          <Text style={estilos.guion}>a</Text>
          {campo(tardeFin, setTardeFin)}
        </View>

        <Text style={estilos.nota}>
          Deja un tramo vacío si ese día no se abre. Las citas ya reservadas fuera del nuevo horario no se borran:
          cancélalas desde la agenda si hace falta.
        </Text>

        <TouchableOpacity style={estilos.botonGuardar} onPress={guardar} disabled={guardando || cargando}>
          <Text style={estilos.textoGuardar}>{guardando ? "Guardando..." : "Guardar horario"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botonVolver} onPress={volver}>
          <Text style={estilos.textoVolver}>Volver al menú</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
