import { FC, useEffect, useState } from "react";
import { useInput } from "../../../hooks/useInput";
import { useSelectorInput } from "../../../hooks/useSelectorInput";
import { InputGeneric } from "../InputGeneric/InputGeneric";
import { SelectorGeneric } from "../SelectorGeneric/SelectorGeneric";

interface ABMProps {
    title: string;
    arrElement?: any[];
    element?: {};
    handleSubmit: Function;
    closeModal: Function;
}


export const ABMComponent: FC<ABMProps> = ({
    title,
    arrElement,
    element,
    handleSubmit,
    closeModal,
}) => {


    const handlePropsForm = () => {
        const result = arrElement?.filter(element => element.type === "input")
        const parseResult = result?.map(({ name, value }) => {
            value ? value : value = ""
            const obj = { name: name, value: value };
            return obj;

        })
        const obj = {} as any;

        if (parseResult != undefined) {
            for (let item of parseResult) {
                obj[item.name] = item.value;
            }
        }
        setInputState(obj)
    }
    useEffect(() => {
        handlePropsForm()
    }, [])


    const [inputState, onInputChange, setInputState]: any = useInput({})

    const [valuesSelector, setValuesSelector] = useState<any>([])

    const handleSelector = (value: any) => {
        const result = valuesSelector.filter((element: any) => element.name === value.name)

        if (result.length > 0) {
            const resultdelete = valuesSelector.filter((element: any) => element.name !== value.name)
            setValuesSelector([
                ...resultdelete,
                value
            ])
        } else {
            setValuesSelector([
                ...valuesSelector,
                value
            ])
        }
    }

    const btnCancelar = () => {
        closeModal(false)
    }
    const submit = () => {
        handleSubmit(
            {
                inputsValues: inputState,
                selectorValues: valuesSelector
            })
    }
    

    return (

        <div>
            <div>
                <h2>{title}</h2>
                <div>
                    {
                        arrElement && arrElement.length > 0 &&
                        arrElement?.map(option => (
                            option.type === "selector"
                                ? <SelectorGeneric
                                    options={option.options}
                                    label={option.label}
                                    handleSelector={handleSelector}
                                    name={option.name}
                                    
                                />
                                : <InputGeneric
                                    placeholder={inputState[option.name]}
                                    label={option.label}
                                    onChange={onInputChange}
                                    name={option.name}
                                    value={inputState[option.name]}
                                />
                        ))
                    }
                </div>
                <div>
                    <button onClick={() => {
                        btnCancelar()
                    }}>Cancelar</button>
                    <button onClick={() => {
                        submit()
                    }}>Guardar</button>
                </div>
            </div>


        </div>
    )
}


// const [inputState, onInputChange, username]: any = useInput({
//     username: 'hola',
//   })

//   const selector1 = [{label:"Ingrediente",options:["Tomate","Lechuga"]}]

//   const arrElements = [

//     {
//       type: "selector",
//       label: "Ingrediente",
//       name:"selector1",
//       options: [" ","Tomate", "Lechuga"]
//     },
//     {
//       type: "input",
//       label: "label input",
//       name: "input1",
//       placeholder: "placeholderInput"
//     },
//     {
//       type: "selector",
//       label: "Ingrediente",
//       name:"selector2",
//       options: [" ","Papa", "Zapallo"]
//     },
//     {
//       type: "input",
//       label: "label input",
//       name: "input2",
//       placeholder: "placeholderInput"
//     },
//   ]