// src/screens/LoginScreen/LoginScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    width: '80%',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '80%',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: '#D8D0C4',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  registerButton: {
    padding: 10,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    textDecorationLine: 'underline',
  },
});
