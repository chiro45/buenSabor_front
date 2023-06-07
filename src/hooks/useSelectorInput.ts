import { useState } from 'react'
// Define un custom hook llamado useSelectorInput que recibe un objeto de estado inicial
export const useSelectorInput = (initialStateSelector: object = {}) => {
  // Define una variable de estado llamada valuesSelector y una función para actualizarla llamada setSelectorsValues
  const [valuesSelector, setSelectorsValues] = useState(initialStateSelector);
  // Define una función llamada onSelectorChange que se llama cuando se produce un cambio en un selector
  const onSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Extrae los valores de la opción seleccionada y su nombre del evento
    const { value, name } = event.target;
    // Actualiza el estado del selector correspondiente con el nuevo valor seleccionado
    setSelectorsValues({
      ...valuesSelector,
      [name]: value
    });
  };
  // Devuelve una tupla con la variable de estado valuesSelector, la función onSelectorChange y la función setSelectorsValues
  return [valuesSelector, onSelectorChange, setSelectorsValues]
}
