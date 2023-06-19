import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  // Utilizamos useState para crear el estado local
  const [state, setState] = useState<T>(() => {
    // Utilizamos getItem para obtener el valor almacenado en localStorage con la clave especificada
    const storedValue = localStorage.getItem(key);
    // Si hay un valor almacenado, lo parseamos como JSON y lo establecemos como el valor inicial del estado
    // De lo contrario, utilizamos el initialValue proporcionado
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Utilizamos useEffect para guardar el nuevo valor en localStorage cada vez que se actualice el estado
  useEffect(() => {
    // Utilizamos setItem para almacenar el valor en localStorage con la clave especificada
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  // Creamos una función updateState para actualizar el estado
  const updateState = (value: T) => {
    setState(value);
  };

  // Devolvemos el estado actual y la función para actualizarlo
  return [state, updateState];
};

