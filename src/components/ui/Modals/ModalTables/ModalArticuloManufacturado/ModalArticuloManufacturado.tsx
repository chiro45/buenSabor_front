import { useEffect, useState } from "react";
import { useInput, useSelectorInput } from "../../../../../hooks";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import { useSelector } from "react-redux";
import { removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { useDispatch } from "react-redux";


export const ModalArticuloManufacturado = () => {
   
  const openModal = useSelector((state: any) => state.ModalsReducer.modalArticuloManufacturado)
    
    const [ingredientes, setIngredientes] = useState<any>([])
    const [optionsValues, setOptionValues] = useState<any>([
        { name: "Papa", unidad: "kg" },
        { name: "Queso", unidad: "gr" },
        { name: "Carne", unidad: "kg" },
        { name: "Lechuga", unidad: "kg" },
    ])
    const [dataCategories, setDataCategories] = useState([]);
    useEffect(() => {
        setIngredientes([{ name: "Pan", cantidad: 500, medida: "mg" }])
    }, [])
    const dispatch = useDispatch()
    const [inputState, onInputChange, setInputState]: any = useInput({
        cantidad: ""
    })
    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput({
        name: ""
    });
    const { cantidad } = inputState
    const { name } = valuesSelector
    const handleSubmitIngredietne = () => {
        const resultMedida = optionsValues.filter((el: any) => el.name === name)
        setIngredientes([...ingredientes,
        {
            name: name,
            cantidad: cantidad,
            medida: resultMedida[0].unidad
        }
        ])
        setInputState({
            cantidad: ""
        })
        setSelectorsValues({
            name: ""
        })
    }

    const handleDeleteElement = (name: string) => {
        const result = ingredientes.filter((el: any) => el.name !== name)
        setIngredientes(result)
        setInputState({
            cantidad: ""
        })
        setSelectorsValues({
            name: ""
        })
    }
    const handleModalState = ()=>{
        dispatch(handleModalsTable("modalArticuloManufacturado"))
        dispatch(removeElementActiveTable())
    }
    return (
        <>
            {
                openModal ===false
                    ? <button onClick={()=>{handleModalState()}}>Press</button>
                    : <LayoutModal>
                        <div>{/* Modal de artículo insumo */}
                            <div>
                                <input type="text" name="denominacion" />
                                <input type="number" name="tiempoEstimadoCocina" />
                                <input type="number" name="precioVenta" />
                                <input type="text" name="descripcion" />
                                <input type="text" name="receta" />
                                <input type="checkbox" name="altaBaja" />
                                <input type="checkbox" name="productoFinal" />
                                <select>
                                    {dataCategories.map((el: any) => <div><option> {el.denominacion}</option></div>)}
                                </select>

                                <input type="text" />
                                <input type="text" />
                            </div>
                            {
                                ingredientes.map((el: any, i: number) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", width: "40vw" }}>
                                        <p>{el.name}</p>
                                        <p>{el.cantidad}</p>
                                        <p>{el.medida}</p>
                                        <button onClick={() => { handleDeleteElement(el.name) }}>Eliminar ingrediente</button>
                                    </div>

                                ))
                            }
                            <input
                                type="number"
                                name="cantidad"
                                onChange={onInputChange}
                                placeholder="Cantidad" />
                            <select name="name" onChange={onSelectorChange}>
                                {
                                    optionsValues.map((el: any) => (
                                        <option>{el.name}</option>
                                    ))
                                }
                            </select>
                            <button onClick={handleSubmitIngredietne}>Add</button></div>


                            <div>
                                <button>Confirmar</button>
                                <button onClick={()=>{handleModalState()}}>Cancelar</button>
                            </div>
                    </LayoutModal>
            }
        </>
    )
}
