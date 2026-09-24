import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./CalendarioScreenStyles";
import { useCalendarioScreen } from "./useCalendarioScreen";

const CalendarioScreen = () => {
  const {
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
  } = useCalendarioScreen();

  // Días de la semana

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  // Días del mes

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Reserva tu Cita</Text>

        <View style={styles.monthHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePreviousMonth}
          >
            <Text style={styles.navButtonText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>
            {monthNames[currentMonth]} {currentYear}
          </Text>

          <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
            <Text style={styles.navButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text key={`weekday-${index}`} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {daysInMonth.map((day) => {
            const isSelected = selectedDate === day;

            return (
              <TouchableOpacity
                key={`day-${day}`}
                style={[
                  styles.dayButton,
                  isSelected && styles.dayButtonSelected,
                ]}
                onPress={() => handleDateSelect(day)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.dayTextSelected]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Horas Disponibles</Text>

        <View style={styles.timeGrid}>
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;

            return (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  isSelected && styles.timeButtonSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.timeTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedTime) && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmAppointment}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.confirmButtonText}>Confirmar Cita</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarioScreen;
