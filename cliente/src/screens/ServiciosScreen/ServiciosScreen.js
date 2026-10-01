import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import estilos from "./ServiciosScreenStyles";
import { useServiciosScreen } from "./useServiciosScreen";

export default function ServiciosScreen() {
  const { usuario } = useLocalSearchParams();

  const {
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

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.bienvenida}>¡Bienvenid@, {usuario}!</Text>

      <Text style={estilos.titulo}>Servicios</Text>

      <Text style={estilos.subtitulo}>
        Selecciona los servicios que deseas para tu mascota
      </Text>

      <TouchableOpacity
        style={estilos.botonRegistroPerro}
        onPress={() => router.push("/registroPerro")}
      >
        <Text style={estilos.textoBotonRegistroPerro}>
          Registrar perro
        </Text>
      </TouchableOpacity>

      <FlatList
        data={serviciosDisponibles}
        keyExtractor={(elemento) => elemento.id}
        renderItem={renderizarElemento}
        style={estilos.lista}
      />

      <TouchableOpacity style={estilos.boton} onPress={manejarContinuar}>
        <Text style={estilos.textoBoton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}