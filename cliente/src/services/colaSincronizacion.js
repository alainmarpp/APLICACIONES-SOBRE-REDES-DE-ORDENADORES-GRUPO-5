import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAutenticado } from './authService';

const CLAVE_COLA = 'cola_peticiones_pendientes';

export async function guardarEnColaOffline(path, options = {}) {
  try {
    const colaActual = JSON.parse((await AsyncStorage.getItem(CLAVE_COLA)) || '[]');
    
    const nuevaAccion = {
      id: Date.now().toString(),
      path,
      options,
      headers: {
        ...(options.headers || {}),
        'Idempotency-Key': `offline-${Date.now()}-${Math.random()}`
      }
    };

    colaActual.push(nuevaAccion);
    await AsyncStorage.setItem(CLAVE_COLA, JSON.stringify(colaActual));
    console.log("📥 Acción guardada en la cola offline local.");
  } catch (error) {
    console.error("Error al guardar en la cola offline:", error);
  }
}


export async function sincronizarColaOffline() {
  try {
    const colaGuardada = await AsyncStorage.getItem(CLAVE_COLA);
    if (!colaGuardada) return;

    const cola = JSON.parse(colaGuardada);
    if (cola.length === 0) return;

    console.log(`🔄 Sincronizando ${cola.length} acciones pendientes...`);
    const nuevaCola = [];

    for (const accion of cola) {
      try {
        await fetchAutenticado(accion.path, {
          ...accion.options,
          headers: accion.headers
        });
        console.log(`✅ Acción ${accion.path} sincronizada con éxito.`);
      } catch (error) {
        nuevaCola.push(accion);
      }
    }

    await AsyncStorage.setItem(CLAVE_COLA, JSON.stringify(nuevaCola));
  } catch (error) {
    console.error("Error al sincronizar la cola offline:", error);
  }
}