import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useInput } from '../../../../../hooks/useInput';
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import axios from 'axios';


const urlFetch = `${import.meta.env.VITE_URL_API}/unidadmedidas`
export const ModalUnidadMedida = () => {

    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalMedidas)
    const elemetActive = useSelector((state: any) => state.TableReducer.elementActive)
    const [inputState, onInputChange, setInputState]: any = useInput()

    useEffect(() => {
        if (openModal === true) {
            setInputState({ nameUnidadMedida: elemetActive !== null ? elemetActive.tipo : "" })
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])

    const handleSubmitModal = () => {
        //TODO: SACAR LAS FUNCIONES DE POST PUT
        if (elemetActive === null) {
            axios.post(urlFetch, {
                tipo: inputState.nameUnidadMedida
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalMedidas"))
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlFetch}/${elemetActive.id}`, {
                ...elemetActive,
                tipo: inputState.nameUnidadMedida
            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalMedidas"))
                })
                .catch((error) => console.error(error))
        }
    }
    return (
        <div>
            {
                openModal === false
                    ? <button onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>ModalUnidadMedida</button>
                    : <LayoutModal>
                        <div>
                            <h1>
                                {
                                    elemetActive !== null
                                        ? "Editar Unidad De Medida"
                                        : "Crear Unidad De Medida"
                                }
                            </h1>
                            <input
                                type="text"
                                placeholder="Ingrese unidad medida"
                                name="nameUnidadMedida"
                                value={inputState.nameUnidadMedida}
                                onChange={onInputChange}
                            />
                            <button
                                onClick={handleSubmitModal}>
                                {
                                    elemetActive !== null
                                        ? "Editar "
                                        : "Crear "
                                }
                            </button>
                            <button onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>Cancelar</button>
                        </div>
                    </LayoutModal>

            }
        </div>
    )
}
