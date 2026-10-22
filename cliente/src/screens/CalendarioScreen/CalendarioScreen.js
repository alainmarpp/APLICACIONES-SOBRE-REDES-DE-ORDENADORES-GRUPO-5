import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Usamos SafeAreaView de safe-area-context para un soporte adecuado en Android
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./CalendarioScreenStyles";
import { useCalendarioScreen } from "./useCalendarioScreen";

const CalendarioScreen = () => {
  const {
    usuario,
    serviciosSeleccionados,
    fechaSeleccionada,
    horaSeleccionada,
    horasDisponibles,
    cargandoHoras,
    mesActual,
    anioActual,
    nombresMeses,
    diasEnMesActual,
    diasSinEmpezar,
    esDiaPasado,
    manejarMesAnterior,
    manejarMesSiguiente,
    manejarSeleccionFecha,
    manejarSeleccionHora,
    manejarConfirmarCita,
    estaHoraReservada,
  } = useCalendarioScreen();

  const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

  const celdasVacias = Array.from({ length: diasSinEmpezar }, () => null);
  const diasDelMes = Array.from(
    { length: diasEnMesActual },
    (_, indice) => indice + 1,
  );

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ScrollView
        style={estilos.contenedor}
        contentContainerStyle={estilos.contenedorContenido}
        showsVerticalScrollIndicator={false}
      >
        <Text style={estilos.tituloCabecera}>Reserva tu Cita</Text>

        {serviciosSeleccionados.length > 0 && (
          <Text style={estilos.subtitulo}>
            {usuario ? `${usuario}: ` : ""}
            {serviciosSeleccionados.join(", ")}
          </Text>
        )}

        <View style={estilos.cabeceraMes}>
          <TouchableOpacity
            style={estilos.botonNavegacion}
            onPress={manejarMesAnterior}
          >
            <Text style={estilos.textoBotonNavegacion}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={estilos.textoMes}>
            {nombresMeses[mesActual]} {anioActual}
          </Text>

          <TouchableOpacity
            style={estilos.botonNavegacion}
            onPress={manejarMesSiguiente}
          >
            <Text style={estilos.textoBotonNavegacion}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.contenedorDiasSemana}>
          {diasSemana.map((dia, indice) => (
            <Text key={`dia-semana-${indice}`} style={estilos.textoDiaSemana}>
              {dia}
            </Text>
          ))}
        </View>

        <View style={estilos.rejillaDias}>
          {celdasVacias.map((_, indice) => (
            <View key={`vacia-${indice}`} style={estilos.botonDia} />
          ))}

          {diasDelMes.map((dia) => {
            const estaSeleccionado = fechaSeleccionada === dia;
            const estaPasado = esDiaPasado(dia);

            return (
              <TouchableOpacity
                key={`dia-${dia}`}
                style={[
                  estilos.botonDia,
                  estaSeleccionado && estilos.botonDiaSeleccionado,
                ]}
                onPress={() => manejarSeleccionFecha(dia)}
                disabled={estaPasado}
              >
                <Text
                  style={[
                    estilos.textoDia,
                    estaSeleccionado && estilos.textoDiaSeleccionado,
                    estaPasado && estilos.textoDiaDeshabilitado,
                  ]}
                >
                  {dia}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={estilos.tituloSeccion}>Horas Disponibles</Text>

        {!fechaSeleccionada && (
          <Text style={estilos.subtitulo}>Elige un día para ver las horas libres</Text>
        )}
        {cargandoHoras && <ActivityIndicator color="#FF6B6B" />}

        <View style={estilos.rejillaHoras}>
          {horasDisponibles.map((hora) => {
            const estaSeleccionada = horaSeleccionada === hora;
            const estaOcupada = estaHoraReservada(hora);
            const sinDatos = !fechaSeleccionada || cargandoHoras;

            return (
              <TouchableOpacity
                key={hora}
                style={[
                  estilos.botonHora,
                  estaSeleccionada && estilos.botonHoraSeleccionado,
                  (estaOcupada || sinDatos) && estilos.botonHoraDeshabilitado,
                ]}
                onPress={() => manejarSeleccionHora(hora)}
                disabled={estaOcupada || sinDatos}
              >
                <Text
                  style={[
                    estilos.textoHora,
                    estaSeleccionada && estilos.textoHoraSeleccionado,
                    sinDatos && estilos.textoHoraInactiva,
                    estaOcupada && estilos.textoHoraDeshabilitado,
                  ]}
                >
                  {hora}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            estilos.botonConfirmar,
            (!fechaSeleccionada || !horaSeleccionada) &&
              estilos.botonConfirmarDeshabilitado,
          ]}
          onPress={manejarConfirmarCita}
          disabled={!fechaSeleccionada || !horaSeleccionada}
        >
          <Text style={estilos.textoBotonConfirmar}>Confirmar Cita</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarioScreen;