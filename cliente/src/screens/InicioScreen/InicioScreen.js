import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HorarioTienda from "../../components/HorarioTienda";
import estilos from "./InicioScreenStyles";
import { useInicioScreen } from "./useInicioScreen";

export default function InicioScreen() {
  const {
    irMiPerfil,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
    irResenas,
    irLocalizacion,
    esPeluquero,
    irPanelPeluquero,
    cerrarSesion,
  } = useInicioScreen();

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView
        style={estilos.pantalla}
        contentContainerStyle={estilos.contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.cabecera}>
          <TouchableOpacity style={estilos.botonPerfil} onPress={irMiPerfil}>
            <Text style={estilos.textoPerfil}>Mi Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.cuerpo}>
          <Text style={estilos.titulo}>Bienvenide </Text>

          <Text style={estilos.subtitulo}>🐾 ¿Qué deseas hacer hoy? 🐾</Text>

          <TouchableOpacity 
            style={[estilos.boton, estilos.botonRosa]} 
            onPress={irMisAnimales}
          >
            <Text style={estilos.textoBotonPrincipal}>🐶 Mis Animales </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[estilos.boton, estilos.botonLila]} 
            onPress={irHacerReserva}
          >
            <Text style={estilos.textoBoton}>📅 Pedir Cita </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[estilos.boton, estilos.botonMenta]} 
            onPress={irMisReservas}
          >
            <Text style={estilos.textoBoton}> 📜 Mis Reservas </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[estilos.boton, estilos.botonMelocoton]} 
            onPress={irResenas}
          >
            <Text style={estilos.textoBoton}>⭐ Reseñas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[estilos.boton, estilos.botonCielo]} 
            onPress={irLocalizacion}
          >
            <Text style={estilos.textoBoton}>📍 Dónde Estamos </Text>
          </TouchableOpacity>

          {esPeluquero && (
            <TouchableOpacity style={[estilos.boton, estilos.botonLila]} onPress={irPanelPeluquero}>
              <Text style={estilos.textoBoton}>✂️ Panel del peluquero</Text>
            </TouchableOpacity>
          )}

          <HorarioTienda />


          <TouchableOpacity style={estilos.botonSalir} onPress={cerrarSesion}>
            <Text style={estilos.textoBotonSalir}>Cerrar Sesión 👋</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}