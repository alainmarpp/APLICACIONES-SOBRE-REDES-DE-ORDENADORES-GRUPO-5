import { useState } from 'react';
import { router } from 'expo-router';

export function useRegisterScreen() {
  const [usuario, setUsuario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleRegistro = () => {
    if (!usuario || !telefono || !contrasena || !confirmarContrasena) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("¡Cuenta registrada con éxito!");
    
    router.replace('/');
  };

  return {
    usuario, setUsuario,
    telefono, setTelefono,
    contrasena, setContrasena,
    confirmarContrasena, setConfirmarContrasena,
    handleRegistro
  };
}
