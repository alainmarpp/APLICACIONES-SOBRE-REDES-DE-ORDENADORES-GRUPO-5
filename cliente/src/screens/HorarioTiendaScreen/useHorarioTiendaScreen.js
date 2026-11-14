import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import { peticion } from "../../services/api";

const formatoHora = /^([01]\d|2[0-3]):([0-5]\d)$/;

function normalizar(texto) {
  const limpio = String(texto || "").trim().replace(".", ":");
  const m = limpio.match(/^(\d{1,2}):(\d{2})$/);
  return m ? `${m[1].padStart(2, "0")}:${m[2]}` : limpio;
}

function avisar(titulo, mensaje) {
  if (Platform.OS === "web") window.alert(`${titulo}\n${mensaje}`);
  else Alert.alert(titulo, mensaje);
}

export function useHorarioTiendaScreen() {
  const [mananaInicio, setMananaInicio] = useState("");
  const [mananaFin, setMananaFin] = useState("");
  const [tardeInicio, setTardeInicio] = useState("");
  const [tardeFin, setTardeFin] = useState("");
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const rellenar = (datos) => {
    const [a, b] = datos.bloques || [];
    setMananaInicio(a?.inicio || "");
    setMananaFin(a?.fin || "");
    setTardeInicio(b?.inicio || "");
    setTardeFin(b?.fin || "");
    setTexto(datos.texto || "");
  };

  useEffect(() => {
    peticion("/horario")
      .then(rellenar)
      .catch((e) => avisar("Error", e.message || "No se pudo cargar el horario."))
      .finally(() => setCargando(false));
  }, []);

  const guardar = async () => {
    if (guardando) return;

    const tramos = [
      [mananaInicio, mananaFin, "mañana"],
      [tardeInicio, tardeFin, "tarde"],
    ];
    const bloques = [];

    for (const [ini, fin, nombre] of tramos) {
      const i = normalizar(ini);
      const f = normalizar(fin);
      if (!i && !f) continue;
      if (!formatoHora.test(i) || !formatoHora.test(f)) {
        avisar("Horario no válido", `Revisa el tramo de ${nombre}: usa el formato HH:MM, por ejemplo 09:00.`);
        return;
      }
      if (i >= f) {
        avisar("Horario no válido", `En el tramo de ${nombre} el cierre tiene que ser posterior a la apertura.`);
        return;
      }
      bloques.push({ inicio: i, fin: f });
    }

    if (bloques.length === 0) {
      avisar("Horario no válido", "Pon al menos un tramo de horario.");
      return;
    }

    setGuardando(true);
    try {
      const datos = await peticion("/horario", { metodo: "PUT", cuerpo: { bloques } });
      rellenar(datos);
      avisar("Guardado", "El horario se ha actualizado. Los clientes ya lo ven y solo podrán reservar dentro de él.");
    } catch (e) {
      avisar("Error", e.message || "No se pudo guardar el horario.");
    } finally {
      setGuardando(false);
    }
  };

  const volver = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/peluquero");
  };

  return {
    mananaInicio, setMananaInicio,
    mananaFin, setMananaFin,
    tardeInicio, setTardeInicio,
    tardeFin, setTardeFin,
    texto,
    cargando,
    guardando,
    guardar,
    volver,
  };
}
