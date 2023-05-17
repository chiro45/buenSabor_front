import { useDispatch } from "react-redux"
import { LayoutModal } from "../LayoutModal/LayoutModal"
import { useSelector } from "react-redux"
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { useInput } from "../../../../../hooks/useInput"
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelectorInput } from "../../../../../hooks/useSelectorInput"
import { useCheckBoxInput } from "../../../../../hooks/useCheckBoxInput"
import { InputGeneric } from "../../../InputGeneric/InputGeneric"
import { Categoria } from "../../../../../interfaces/entidades"
const urlFetch = `${import.meta.env.VITE_URL_API}/categorias`

export const ModalCategoria = () => {
    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalCategoria)
    const elementActive:Categoria = useSelector((state: any) => state.TableReducer.elementActive)
    const [dataCategories, setDataCategories] = useState([]);
    const [inputState, onInputChange, setInputState]: any = useInput()
    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput();
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        altaBaja: false,
    });

    useEffect(() => {
        if (openModal === true) {
            setInputState({ denominacion: elementActive !== null ? elementActive.denominacion : "" })
            setSelectorsValues({
                categoria: elementActive !== null ?
                    elementActive.parent !== null
                        ? elementActive.parent.id
                        : ""
                    : ""
            })
            setCheckboxStates({
                altaBaja: elementActive !== null ? elementActive.altaBaja : false,
            })
            getDataCategories()
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])

    const getDataCategories = () => {
        axios.get(urlFetch)
            .then((response) => { setDataCategories(response.data) })
            .catch((error) => console.error(error))
    };



    const handleSubmitModal = () => {

        if (elementActive === null) {
            axios.post(urlFetch, {
                parent: valuesSelector.categoria !== "" ? { id: parseInt(valuesSelector.categoria) } : null,
                denominacion: inputState.denominacion,
                altaBaja: checkboxStates.altaBaja
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalCategoria"))
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlFetch}/${elementActive.id}`, {
                ...elementActive,
                parent: valuesSelector.categoria !== "" ? { id: parseInt(valuesSelector.categoria) } : null,
                denominacion: inputState.denominacion,
                altaBaja: checkboxStates.altaBaja
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalCategoria"))
                })
                .catch((error) => console.error(error))
        }
    }
    return (
        <div>
            {
                openModal === false
                    ? <button onClick={() => { dispatch(handleModalsTable("modalCategoria")) }}>AgregarCategoria</button>
                    : <LayoutModal>
                        <div>
                            <h1>
                                {
                                    elementActive !== null
                                        ? "Editar Categoria"
                                        : "Crear Categoria"
                                }
                            </h1>
                            <InputGeneric
                                type="text"
                                placeholder="Ingrese denominacion de la Categoria"
                                name="denominacion"
                                value={inputState.denominacion}
                                onChange={onInputChange}
                            />
                            <select onChange={onSelectorChange} name="categoria" >
                                <option >Selecciona</option>
                                {
                                    dataCategories.map((el: any) => (
                                        <option
                                            key={el.id}
                                            value={el.id}
                                            selected={
                                                elementActive !== null
                                                    ?
                                                    elementActive.parent !== null && elementActive.parent.id === el.id
                                                        ? true
                                                        : false
                                                    : false}
                                        >
                                            {el.denominacion}
                                        </option>
                                    ))
                                }
                            </select>

                            <InputGeneric
                                label="Dar Alta?"
                                onChange={onInputCheckboxChange}
                                name="altaBaja"
                                checked={checkboxStates.altaBaja}
                                value={checkboxStates.altaBaja}
                                type="checkbox" />
                            <button
                                onClick={handleSubmitModal}>
                                {
                                    elementActive !== null
                                        ? "Editar "
                                        : "Crear "
                                }
                            </button>
                            <button onClick={() => { dispatch(handleModalsTable("modalCategoria")) }}>Cancelar</button>
                        </div>
                    </LayoutModal>

            }
        </div >
    )
}
