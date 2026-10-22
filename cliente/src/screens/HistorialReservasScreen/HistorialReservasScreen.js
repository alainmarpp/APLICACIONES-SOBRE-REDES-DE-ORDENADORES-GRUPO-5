import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";

import estilos from "./HistorialReservasScreenStyles";
import { useHistorialReservasScreen } from "./useHistorialReservasScreen";

export default function HistorialReservasScreen() {
  const {
    reservas,
    cargando,
    error,
    volverAlMenu,
    eliminarReserva,
  } = useHistorialReservasScreen();

  const confirmarEliminacion = (id) => {
    if (Platform.OS === 'web') {
      const aceptado = window.confirm("¿Estás seguro de que deseas eliminar esta reserva?");
      if (aceptado) {
        eliminarReserva(id);
      }
    } else {
      Alert.alert(
        "Eliminar reserva",
        "¿Estás seguro de que deseas eliminar esta reserva?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: () => eliminarReserva(id),
          },
        ]
      );
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Fecha no disponible";

    const fechaTexto = String(fecha).slice(0, 10);
    const partes = fechaTexto.split("-");

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return fechaTexto;
  };

  const renderReserva = ({ item }) => {
    const animal = item.Animal || item.animal;
    const nombreAnimal = animal?.nombreAnimal || "Animal";
    const servicios = item.servicio || item.servicios || "No especificados";

    return (
      <View style={estilos.tarjetaReserva}>
        <Text style={estilos.nombreAnimal}>
          {nombreAnimal}
        </Text>

        <Text style={estilos.detalle}>
          Fecha: {formatearFecha(item.fecha)}
        </Text>

        <Text style={estilos.detalle}>
          Hora: {item.horainicio || "No disponible"}
          {item.horafin ? ` - ${item.horafin}` : ""}
        </Text>

        <Text style={estilos.etiquetaServicios}>
          Servicios:
        </Text>

        <Text style={estilos.detalle}>
          {Array.isArray(servicios)
            ? servicios.join(", ")
            : String(servicios).replace(/,/g, ", ")}
        </Text>

        {/* Botón para eliminar esta reserva */}
        <TouchableOpacity
          style={estilos.botonEliminar}
          onPress={() => confirmarEliminacion(item.id)}
        >
          <Text style={estilos.textoBotonEliminar}>Eliminar reserva</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>
        Historial de Reservas
      </Text>

      {cargando ? (
        <View style={estilos.estado}>
          <ActivityIndicator size="large" color="#8A8175" />
          <Text style={estilos.mensaje}>
            Cargando reservas...
          </Text>
        </View>
      ) : error ? (
        <Text style={estilos.mensajeError}>
          {error}
        </Text>
      ) : reservas.length === 0 ? (
        <Text style={estilos.historial}>
          No hay reservas por el momento
        </Text>
      ) : (
        <FlatList
          style={estilos.lista}
          data={reservas}
          renderItem={renderReserva}
          keyExtractor={(item, index) =>
            String(item.id ?? index)
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={estilos.boton}
        onPress={volverAlMenu}
      >
        <Text style={estilos.textoBoton}>
          Volver al menú
        </Text>
      </TouchableOpacity>
    </View>
  );
}