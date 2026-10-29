import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./ServiciosScreenStyles";
import { useServiciosScreen } from "./useServiciosScreen";

const MOTIVOS = ["✨", "✦", "🐾", "✧"];
const COLORES_MOTIVO = ["#8E3E63", "#EADAE4"];
const ESTAMPADO = [];

for (let fila = 0; fila < 8; fila++) {
  for (let col = 0; col < 3; col++) {
    const i = fila * 3 + col;
    ESTAMPADO.push({
      clave: i,
      texto: MOTIVOS[i % MOTIVOS.length],
      color: COLORES_MOTIVO[i % COLORES_MOTIVO.length],
      top: `${fila * 12 + 4}%`,
      left: `${col * 32 + (fila % 2 === 0 ? 5 : 18)}%`,
      giro: `${i % 2 === 0 ? -10 : 10}deg`,
      size: 14 + (i % 3) * 4,
    });
  }
}

function emojiServicio(nombre) {
  const n = String(nombre || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (n.includes("bano") || n.includes("baño")) return "🛁";
  if (n.includes("pelo")) return "🪮";
  if (n.includes("corte")) return "💅";
  if (n.includes("dient") || n.includes("dientes")) return "🦷";
  if (n.includes("pulga") || n.includes("garrapatas")) return "🌿";
  return "🎀";
}

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
        activeOpacity={0.85}
        style={[
          estilos.itemServicio,
          estaSeleccionado && estilos.itemServicioSeleccionado,
        ]}
        onPress={() => alternarServicio(elemento.id)}
      >
        <Text style={estilos.emojiServicio}>{emojiServicio(elemento.nombre)}</Text>

        <Text
          style={[
            estilos.textoServicio,
            estaSeleccionado && estilos.textoServicioSeleccionado,
          ]}
        >
          {elemento.nombre}
        </Text>

        <View
          style={[
            estilos.circulo,
            estaSeleccionado && estilos.circuloSeleccionado,
          ]}
        >
          {estaSeleccionado && <Text style={estilos.check}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  const cabecera = (
    <View style={estilos.cabecera}>
      <Text style={estilos.bienvenida}>Hola, {usuario || "bienvenid@"} </Text>

      <Text style={estilos.titulo}> Servicios</Text>

      <Text style={estilos.subtitulo}>
        Selecciona los tratamientos de belleza para tu animal
      </Text>
    </View>
  );

  const cantidad = serviciosSeleccionados.length;

  return (
    <SafeAreaView style={estilos.pantalla}>
      <View style={estilos.estampado} pointerEvents="none">
        {ESTAMPADO.map((m) => (
          <Text
            key={m.clave}
            style={[
              estilos.adorno,
              {
                top: m.top,
                left: m.left,
                fontSize: m.size,
                color: m.color,
                transform: [{ rotate: m.giro }],
              },
            ]}
          >
            {m.texto}
          </Text>
        ))}
      </View>

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
          <Text style={estilos.textoBoton}>
            {cantidad > 0 ? `Confirmar (${cantidad}) ✨` : "Seleccionar servicios"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}