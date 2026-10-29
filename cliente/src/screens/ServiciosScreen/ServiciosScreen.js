import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./ServiciosScreenStyles";
import { useServiciosScreen } from "./useServiciosScreen";

export default function ServiciosScreen() {
  const { usuario } = useLocalSearchParams();

  const {
    cargando,
    serviciosDisponibles,
    serviciosSeleccionados,
    alternarServicio,
    manejarContinuar,
  } = useServiciosScreen();

  const renderizarElemento = ({ item: elemento }) => {
    const estaSeleccionado = serviciosSeleccionados.includes(elemento.id);

    return (
      <TouchableOpacity
        style={[
          estilos.itemServicio,
          estaSeleccionado && estilos.itemServicioSeleccionado,
        ]}
        onPress={() => alternarServicio(elemento.id)}
      >
        <Text
          style={[
            estilos.textoServicio,
            estaSeleccionado && estilos.textoServicioSeleccionado,
          ]}
        >
          {elemento.nombre}
        </Text>
      </TouchableOpacity>
    );
  };

  const cabecera = (
    <View style={estilos.cabecera}>
      <Text style={estilos.bienvenida}>¡Bienvenid@, {usuario}!</Text>

      <Text style={estilos.titulo}>Servicios</Text>

      <Text style={estilos.subtitulo}>
        Selecciona los servicios que deseas para tu mascota
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={estilos.pantalla}>
      <FlatList
        data={serviciosDisponibles}
        keyExtractor={(elemento) => String(elemento.id)}
        renderItem={renderizarElemento}
        extraData={serviciosSeleccionados}
        style={estilos.lista}
        contentContainerStyle={estilos.contenidoLista}
        ListHeaderComponent={cabecera}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>
            {cargando ? "Cargando servicios..." : "No hay servicios disponibles."}
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />

      <View style={estilos.pie}>
        <TouchableOpacity style={estilos.boton} onPress={manejarContinuar}>
          <Text style={estilos.textoBoton}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}