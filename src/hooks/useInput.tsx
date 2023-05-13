import { useState } from 'react'

export const useInput = (intialInput: object = {}) => {
    console.log(intialInput)
    const [inputState, setInputState] = useState(intialInput);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputState({
            ...inputState,
            [name]: value,
            //Con esta forma de los corchetes cambio unicamente el valor que paso
        });
    }

    return [inputState,onInputChange, setInputState]
}