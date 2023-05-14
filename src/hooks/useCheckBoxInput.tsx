import { useState } from "react";

// Este hook personalizado recibe un objeto como entrada que se utilizará para inicializar los estados de los checkboxes
export const useCheckBoxInput = (initialInput: object = {}) => {
    // Define una variable de estado para almacenar los estados actuales de los checkboxes
    const [checkboxStates, setCheckboxStates] = useState(initialInput);
    // Define una función para manejar los cambios de estado de los checkboxes
    const onInputCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Extrae el nombre y estado del checkbox que cambió
        const { name, checked } = event.target;
        // Actualiza el estado de los checkboxes mediante la función de actualización del estado anterior
        setCheckboxStates((prevState) => ({
            ...prevState, // Copia el estado anterior de los checkboxes
            [name]: checked, // Actualiza el estado del checkbox que cambió
        }));
    }
    // Devuelve un array que contiene la función de manejo de eventos de los checkboxes, el estado actual de los checkboxes y la función de actualización del estado de los checkboxes
    return [onInputCheckboxChange, checkboxStates, setCheckboxStates]
}