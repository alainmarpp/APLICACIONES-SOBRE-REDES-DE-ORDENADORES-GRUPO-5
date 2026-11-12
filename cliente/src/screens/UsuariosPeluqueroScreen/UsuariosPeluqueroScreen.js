import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import estilos from "./UsuariosPeluqueroScreenStyles";
import { useUsuariosPeluqueroScreen } from "./useUsuariosPeluqueroScreen";

export default function UsuariosPeluqueroScreen() {
  const { usuarios, yo, cargando, error, cargar, cambiarRol, eliminar } = useUsuariosPeluqueroScreen();

  return (
    <SafeAreaView style={estilos.pantalla}>
      <ScrollView contentContainerStyle={estilos.contenido} showsVerticalScrollIndicator={false}>
        <Text style={estilos.titulo}>👥 Usuarios</Text>

        {cargando ? (
          <Text style={estilos.aviso}>Cargando usuarios...</Text>
        ) : error ? (
          <View>
            <Text style={estilos.error}>{error}</Text>
            <TouchableOpacity style={estilos.botonSecundario} onPress={cargar}>
              <Text style={estilos.textoSecundario}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : usuarios.length === 0 ? (
          <Text style={estilos.aviso}>No hay usuarios.</Text>
        ) : (
          usuarios.map((usuario) => {
            const esPeluquero = usuario.rol === "peluquero";
            const soyYo = usuario.nombre === yo;

            return (
              <View key={usuario.nombre} style={estilos.tarjeta}>
                <View style={estilos.fila}>
                  <Text style={estilos.nombre}>{usuario.nombre}{soyYo ? " (tú)" : ""}</Text>
                  <View style={[estilos.etiqueta, esPeluquero ? estilos.etiquetaPeluquero : estilos.etiquetaCliente]}>
                    <Text style={estilos.textoEtiqueta}>{esPeluquero ? "Peluquero" : "Cliente"}</Text>
                  </View>
                </View>
                <Text style={estilos.detalle}>Tel: {usuario.tlf}</Text>
                <Text style={estilos.detalle}>
                  {usuario.animales} perro(s) · {usuario.reservas} reserva(s)
                </Text>

                {!soyYo && (
                  <View style={estilos.acciones}>
                    {esPeluquero ? (
                      <TouchableOpacity style={estilos.botonAccion} onPress={() => cambiarRol(usuario, "cliente")}>
                        <Text style={estilos.textoAccion}>Quitar rol de peluquero</Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity style={estilos.botonContratar} onPress={() => cambiarRol(usuario, "peluquero")}>
                          <Text style={estilos.textoContratar}>Contratar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.botonEliminar} onPress={() => eliminar(usuario)}>
                          <Text style={estilos.textoEliminar}>Eliminar</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
