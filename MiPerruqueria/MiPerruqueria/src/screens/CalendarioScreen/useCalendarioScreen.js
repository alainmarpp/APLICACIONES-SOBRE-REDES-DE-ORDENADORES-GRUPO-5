import { useState } from "react";
import { Alert } from "react-native";

export const useCalendarioScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(8);
  const [currentYear, setCurrentYear] = useState(2026);

  // Horas disponibles

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }

    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }

    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        "Error",
        "Por favor selecciona un día y una hora para tu cita.",
      );
      return;
    }

    Alert.alert(
      "Cita Confirmada",
      `Tu cita ha sido reservada para el día ${selectedDate} a las ${selectedTime}.`,
    );
  };

  return {
    selectedDate,
    selectedTime,
    timeSlots,
    currentMonth,
    currentYear,
    monthNames,
    handlePreviousMonth,
    handleNextMonth,
    handleDateSelect,
    handleTimeSelect,
    handleConfirmAppointment,
  };
};
