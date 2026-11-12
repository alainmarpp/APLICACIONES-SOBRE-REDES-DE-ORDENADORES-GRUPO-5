import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HorarioTienda from "../../components/HorarioTienda";
import estilos from "./PeluqueroMenuScreenStyles";
import { usePeluqueroMenuScreen } from "./usePeluqueroMenuScreen";

export default function PeluqueroMenuScreen() {
  const { citasHoy, nombre, irReservas, irUsuarios, irHorario, irInicioClientes, cerrarSesion } = usePeluqueroMenuScreen();

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.contenido} showsVerticalScrollIndicator={false}>
        <Text style={estilos.titulo}>✂️ Panel del peluquero</Text>
        {nombre ? <Text style={estilos.saludo}>Hola, {nombre}</Text> : null}

        {citasHoy !== null && (
          <View style={estilos.resumen}>
            <Text style={estilos.resumenNumero}>{citasHoy}</Text>
            <Text style={estilos.resumenTexto}>{citasHoy === 1 ? "cita para hoy" : "citas para hoy"}</Text>
          </View>
        )}

        <TouchableOpacity style={[estilos.boton, estilos.botonRosa]} onPress={irReservas}>
          <Text style={estilos.textoBoton}>📅 Reservas</Text>
          <Text style={estilos.subtextoBoton}>Agenda diaria y cancelar citas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.boton, estilos.botonLila]} onPress={irUsuarios}>
          <Text style={estilos.textoBoton}>👥 Usuarios</Text>
          <Text style={estilos.subtextoBoton}>Contratar o eliminar usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.boton, estilos.botonMenta]} onPress={irHorario}>
          <Text style={estilos.textoBoton}>🕒 Modificar horario</Text>
          <Text style={estilos.subtextoBoton}>Horario fijo de la tienda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.boton, estilos.botonLila]} onPress={irInicioClientes}>
          <Text style={estilos.textoBoton}>🐶 Volver al inicio</Text>
          <Text style={estilos.subtextoBoton}>Pantalla principal de usuario</Text>
        </TouchableOpacity>

        <HorarioTienda />

        <TouchableOpacity style={estilos.botonSalir} onPress={cerrarSesion}>
          <Text style={estilos.textoSalir}>Cerrar sesión 👋</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
