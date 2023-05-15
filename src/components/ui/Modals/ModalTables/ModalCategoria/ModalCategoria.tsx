import { useDispatch } from "react-redux"
import { LayoutModal } from "../LayoutModal/LayoutModal"
import { useSelector } from "react-redux"
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { useInput } from "../../../../../hooks/useInput"
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelectorInput } from "../../../../../hooks/useSelectorInput"
const urlFetch = ' http://localhost:9000/categorias'

export const ModalCategoria = () => {
    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalcategoria)
    const elemetActive = useSelector((state: any) => state.TableReducer.elementActive)
    const [dataCategories, setDataCategories] = useState([]);
    const [inputState, onInputChange, setInputState]: any = useInput()
    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput();


    useEffect(() => {
        if (openModal === true) {
            setInputState({ denominacion: elemetActive !== null ? elemetActive.denominacion : "" })
            setSelectorsValues({
                categoria: elemetActive !== null ?
                    elemetActive.parent !== null
                        ? elemetActive.parent.id
                        : ""
                    : ""
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

        if (elemetActive === null) {
            axios.post(urlFetch, {
                parent: valuesSelector.categoria !== "" ? { id: parseInt(valuesSelector.categoria) } : null,
                denominacion: inputState.denominacion
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalcategoria"))
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlFetch}/${elemetActive.id}`, {
                ...elemetActive,
                parent: valuesSelector.categoria !== "" ? { id: parseInt(valuesSelector.categoria) } : null,
                denominacion: inputState.denominacion
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalcategoria"))
                })
                .catch((error) => console.error(error))
        }
    }
    return (
        <div>
            {
                openModal === false
                    ? <button onClick={() => { dispatch(handleModalsTable("modalcategoria")) }}>AgregarCategoria</button>
                    : <LayoutModal>
                        <div>
                            <h1>
                                {
                                    elemetActive !== null
                                        ? "Editar Categoria"
                                        : "Crear Categoria"
                                }
                            </h1>
                            <input
                                type="text"
                                placeholder="Ingrese denominacion de la Categoria"
                                name="denominacion"
                                value={inputState.denominacion}
                                onChange={onInputChange}
                            />
                            <select onChange={onSelectorChange} name="categoria" >
                                <option>selecciona</option>
                                {
                                    dataCategories.map((el: any) => (
                                        <option
                                            key={el.id}
                                            value={el.id}
                                            selected={
                                                elemetActive !== null
                                                    ?
                                                    elemetActive.parent !== null && elemetActive.parent.id === el.id
                                                        ? true
                                                        : false
                                                    : false}
                                        >
                                            {el.denominacion}
                                        </option>
                                    ))
                                }
                            </select>
                            <button
                                onClick={handleSubmitModal}>
                                {
                                    elemetActive !== null
                                        ? "Editar "
                                        : "Crear "
                                }
                            </button>
                            <button onClick={() => { dispatch(handleModalsTable("modalcategoria")) }}>Cancelar</button>
                        </div>
                    </LayoutModal>

            }
        </div >
    )
}
