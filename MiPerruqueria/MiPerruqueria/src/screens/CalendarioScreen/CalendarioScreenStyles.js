import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: '#FF6B6B', 
    fontWeight: 'bold',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayText: {
    width: width / 9,
    textAlign: 'center',
    color: '#888',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: width / 9,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  dayButtonSelected: {
    backgroundColor: '#FF6B6B',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  dayTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  dayTextDisabled: {
    color: '#CCC',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeButton: {
    width: '23%',
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeButtonSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  timeText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmButtonDisabled: {
    backgroundColor: '#FFC0C0',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});