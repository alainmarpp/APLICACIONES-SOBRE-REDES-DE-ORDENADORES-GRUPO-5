import { Text, TouchableOpacity, View } from "react-native";
import estilos from "./InicioScreenStyles";
import { useInicioScreen } from "./useInicioScreen";

export default function InicioScreen() {
  const {
    irMiPerfil,
    irMisAnimales,
    irHacerReserva,
    irMisReservas,
    irResenas,    // Recuperado de la rama main
    cerrarSesion, // Recuperado de la rama logout
  } = useInicioScreen();

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity
        style={estilos.botonPerfil}
        onPress={irMiPerfil}
      >
        <Text style={estilos.textoPerfil}>Mi perfil</Text>
      </TouchableOpacity>

      <Text style={estilos.titulo}>Pantalla Inicial</Text>

      <Text style={estilos.subtitulo}>
        ¿Qué deseas hacer?
      </Text>

      <TouchableOpacity
        style={estilos.boton}
        onPress={irMisAnimales}
      >
        <Text style={estilos.textoBoton}>
          Mis animales
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.boton}
        onPress={irHacerReserva}
      >
        <Text style={estilos.textoBoton}>
          Hacer reserva
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.boton}
        onPress={irMisReservas}
      >
        <Text style={estilos.textoBoton}>
          Mis reservas
        </Text>
      </TouchableOpacity>

      {/* Botón de Reseñas (rama main) */}
      <TouchableOpacity
        style={estilos.boton}
        onPress={irResenas}
      >
        <Text style={estilos.textoBoton}>
          Reseñas
        </Text>
      </TouchableOpacity>

      {/* Botón de Cerrar Sesión (rama logout) */}
      <TouchableOpacity
        style={estilos.botonSalir}
        onPress={cerrarSesion}
      >
        <Text style={estilos.textoBotonSalir}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}