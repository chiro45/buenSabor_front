import { useState } from 'react'

export const useInput = (intialInput:object) => {
  
    const [inputState, setInputState] = useState(intialInput);

    const onInputChange = ({ target }: any) => {
        const { name, value } = target;
        setInputState({
            ...inputState,
            [name]: value,
            //Con esta forma de los corchetes cambio unicamente el valor que paso
        });
    }

    return{
        ...inputState,
        inputState,
        onInputChange
    }
}