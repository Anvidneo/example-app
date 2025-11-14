import { useEffect, useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export function useUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email no válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    // Validación en tiempo real pero solo muestra errores después de intentar validar
    const isNameValid = name.trim().length > 0;
    const isEmailValid = /\S+@\S+\.\S+/.test(email.trim());
    setIsValid(isNameValid && isEmailValid);
    
    // Limpiar errores cuando el usuario corrige los campos
    if (errors.name && isNameValid) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
    if (errors.email && isEmailValid) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [name, email, errors.name, errors.email]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setErrors({});
  };

  return {
    name,
    setName,
    email,
    setEmail,
    isValid,
    errors,
    validateForm,
    resetForm,
  };
}