import { useState } from 'react';
import { Alert } from 'react-native';

export const useCalendarioScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Lista de horas disponibles 
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '15:00', '16:00', '17:00', '18:00'
  ];

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    // Al cambiar de día  resetear la hora
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Por favor selecciona un día y una hora para tu cita.');
      return;
    }
    
    Alert.alert(
      'Cita Confirmada', 
      `Tu cita ha sido reservada para el día ${selectedDate} a las ${selectedTime}.`
    );
  };

  return {
    selectedDate,
    selectedTime,
    timeSlots,
    handleDateSelect,
    handleTimeSelect,
    handleConfirmAppointment
  };
};