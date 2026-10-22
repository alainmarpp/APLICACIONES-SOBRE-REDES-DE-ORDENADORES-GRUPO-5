import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contenedorContenido: {
    paddingTop: 10,
    paddingBottom: 40, // Otorga espacio extra al final para no chocar con el botón atrás/gestos
  },
  tituloCabecera: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  cabeceraMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  textoMes: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  botonNavegacion: {
    padding: 10,
  },
  textoBotonNavegacion: {
    fontSize: 18,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  contenedorDiasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textoDiaSemana: {
    width: width / 9,
    textAlign: 'center',
    color: '#888',
    fontWeight: '600',
  },
  rejillaDias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  botonDia: {
    width: width / 9,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  botonDiaSeleccionado: {
    backgroundColor: '#FF6B6B',
  },
  textoDia: {
    fontSize: 16,
    color: '#333',
  },
  textoDiaSeleccionado: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  textoDiaDeshabilitado: {
    color: '#CCC',
  },
  rejillaHoras: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botonHora: {
    width: '23%',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonHoraSeleccionado: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  textoHora: {
    color: '#555',
    fontSize: 14,
    fontWeight: '500',
  },
  textoHoraSeleccionado: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  botonConfirmar: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  botonConfirmarDeshabilitado: {
    backgroundColor: '#FFC0C0',
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotonConfirmar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonHoraDeshabilitado: {
    backgroundColor: '#F0F0F0',
    borderColor: '#E0E0E0',
  },
  textoHoraInactiva: {
    color: '#CCCCCC',
  },
  textoHoraDeshabilitado: {
    color: '#CCCCCC',
    textDecorationLine: 'line-through',
  },
});