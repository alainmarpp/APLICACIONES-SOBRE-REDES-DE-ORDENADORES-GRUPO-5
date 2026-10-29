import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./HistorialAnimalesScreenStyles";
import { useHistorialAnimalesScreen } from "./useHistorialAnimalesScreen";

export default function HistorialAnimalesScreen() {
  const {
    animales,
    cargando,
    error,
    volverAlMenu,
    irRegistrarPerro,
  } = useHistorialAnimalesScreen();

  const renderAnimal = ({ item: animal }) => (
    <View style={estilos.tarjeta}>
      <Text style={estilos.nombre}>{animal.nombreAnimal}</Text>

      <Text style={estilos.dato}>
        Raza: {animal.raza || "No especificada"}
      </Text>

      <Text style={estilos.dato}>
        Edad: {animal.edad ?? "No especificada"}
      </Text>

      <Text style={estilos.dato}>
        Peso: {animal.peso ?? "No especificado"}
        {animal.peso != null ? " kg" : ""}
      </Text>
    </View>
  );

  const cabecera = (
    <Text style={estilos.titulo}>Historial de animales</Text>
  );

  const contenidoVacio = cargando ? (
    <View style={estilos.estado}>
      <ActivityIndicator size="large" color="#8C8174" />
    </View>
  ) : error ? (
    <Text style={estilos.mensaje}>{error}</Text>
  ) : (
    <Text style={estilos.mensaje}>No hay animales registrados.</Text>
  );

  const pieLista = (
    <TouchableOpacity
      style={estilos.enlaceRegistro}
      onPress={irRegistrarPerro}
    >
      <Text style={estilos.textoEnlaceRegistro}>
        ¿Deseas registrar un nuevo perro?
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.pantalla}>
      <FlatList
        style={estilos.lista}
        contentContainerStyle={estilos.contenidoLista}
        data={cargando || error ? [] : animales}
        renderItem={renderAnimal}
        keyExtractor={(animal, index) => String(animal.id ?? index)}
        ListHeaderComponent={cabecera}
        ListEmptyComponent={contenidoVacio}
        ListFooterComponent={cargando ? null : pieLista}
        showsVerticalScrollIndicator={false}
      />

      <View style={estilos.pie}>
        <TouchableOpacity style={estilos.boton} onPress={volverAlMenu}>
          <Text style={estilos.textoBoton}>Volver al menú</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}