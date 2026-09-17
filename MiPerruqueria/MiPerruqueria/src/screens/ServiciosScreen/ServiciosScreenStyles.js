
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  serviceItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  serviceItemSelected: {
    backgroundColor: '#D8D0C4', 
    borderColor: '#D8D0C4',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  serviceTextSelected: {
    color: '#000000',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#D8D0C4',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});