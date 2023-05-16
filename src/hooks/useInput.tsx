import { useState } from 'react';

// El parámetro initialInput tiene un valor por defecto de un objeto vacío
export const useInput = (initialInput: object = {}) => {
    // Creamos un estado con la función useState que tendrá como valor inicial initialInput
    const [inputState, setInputState] = useState(initialInput);
    // La función onInputChange es una función de manejo de eventos que se ejecutará cada vez que el valor del input cambie
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Extraemos el nombre y el valor del input del evento
        const { name, value } = event.target;
        // Actualizamos el estado usando la función setInputState
        setInputState({
            // Utilizamos el operador spread (...) para copiar el estado actual
            ...inputState,
            // Utilizamos corchetes para poder actualizar una propiedad específica del objeto con el nombre de la propiedad en tiempo de ejecución
            [name]: value,
        });
    }
    // Devolvemos un array con tres elementos: el estado actual de los inputs, la función de manejo de eventos onInputChange y la función setInputState para actualizar manualmente el estado en cualquier momento
    return [inputState, onInputChange, setInputState];
}
