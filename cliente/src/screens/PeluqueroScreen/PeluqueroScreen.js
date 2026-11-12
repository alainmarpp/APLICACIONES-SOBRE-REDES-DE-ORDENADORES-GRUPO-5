import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./PeluqueroScreenStyles";
import { usePeluqueroScreen } from "./usePeluqueroScreen";

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

function fechaLegible(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  const f = new Date(anio, mes - 1, dia);
  return `${DIAS[f.getDay()]} ${dia}/${String(mes).padStart(2, "0")}/${anio}`;
}

export default function PeluqueroScreen() {
  const {
    fecha,
    citas,
    proxima,
    cargando,
    error,
    cambiarDia,
    irAHoy,
    irAProxima,
    cancelarCita,
    recargar,
  } = usePeluqueroScreen();

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.contenido} showsVerticalScrollIndicator={false}>
        <Text style={estilos.titulo}>📅 Reservas</Text>

        <View style={estilos.selectorDia}>
          <TouchableOpacity style={estilos.flecha} onPress={() => cambiarDia(-1)}>
            <Text style={estilos.textoFlecha}>{"<"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={irAHoy} style={estilos.fechaCaja}>
            <Text style={estilos.fecha}>{fechaLegible(fecha)}</Text>
            <Text style={estilos.pistaHoy}>Toca para ir a hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.flecha} onPress={() => cambiarDia(1)}>
            <Text style={estilos.textoFlecha}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {cargando ? (
          <Text style={estilos.aviso}>Cargando la agenda...</Text>
        ) : error ? (
          <View>
            <Text style={estilos.error}>{error}</Text>
            <TouchableOpacity style={estilos.botonSecundario} onPress={recargar}>
              <Text style={estilos.textoSecundario}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : citas.length === 0 ? (
          <View>
            <Text style={estilos.aviso}>No hay citas este día 🐾</Text>
            {proxima ? (
              <TouchableOpacity style={estilos.botonSecundario} onPress={irAProxima}>
                <Text style={estilos.textoSecundario}>Ir al siguiente día con citas ({fechaLegible(proxima)})</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          [
            <Text key="total" style={estilos.total}>
              {citas.length} {citas.length === 1 ? "cita" : "citas"} este día
            </Text>,
            ...citas.map((cita) => (
            <View key={cita.id} style={estilos.tarjeta}>
              <Text style={estilos.hora}>
                {cita.horainicio} - {cita.horafin}
              </Text>
              <Text style={estilos.perro}>
                🐶 {cita.perro?.nombre || "Perro"}
                {cita.perro?.raza ? ` (${cita.perro.raza})` : ""}
              </Text>
              <Text style={estilos.detalle}>Servicios: {cita.servicio}</Text>
              <Text style={estilos.detalle}>
                Cliente: {cita.cliente.nombre}
                {cita.cliente.tlf ? ` · ${cita.cliente.tlf}` : ""}
              </Text>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => cancelarCita(cita)}>
                <Text style={estilos.textoCancelar}>Cancelar cita</Text>
              </TouchableOpacity>
            </View>
            )),
          ]
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
