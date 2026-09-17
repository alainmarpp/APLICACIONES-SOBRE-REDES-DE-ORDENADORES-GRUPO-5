import { useState } from 'react';
import { router } from 'expo-router';

export function useLoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (!usuario || !contrasena) {
      alert("Por favor, rellena todos los campos.");
      return;
    }
    
    alert(`Intentando iniciar sesión con el usuario: ${usuario}`);
  };

  const handleIrARegistro = () => {
    router.push('/registro');
  };

  return {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    handleLogin,
    handleIrARegistro
  };
}
