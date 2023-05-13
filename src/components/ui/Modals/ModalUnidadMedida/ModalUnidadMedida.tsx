import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useInput } from '../../../../hooks/useInput';
import { removeElementActiveTable } from "../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer";

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
        if (elemetActive !== null) {
            //funcion de editar
        } else {
            //funcion de crear
        }
    }

    return (
        <div>
            {
                openModal === false
                    ? <button onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>ModalUnidadMedida</button>
                    : <div>
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

            }
        </div>
    )
}
