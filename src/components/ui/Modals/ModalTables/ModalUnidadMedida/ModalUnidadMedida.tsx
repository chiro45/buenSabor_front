import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useInput } from '../../../../../hooks/useInput';
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import axios from 'axios';
import { UnidadMedida } from "../../../../../interfaces/entidades";
import { useCheckBoxInput } from "../../../../../hooks/useCheckBoxInput";
import { InputGeneric } from "../../../InputGeneric/InputGeneric";

const urlFetch = `${import.meta.env.VITE_URL_API}/unidadmedidas`

export const ModalUnidadMedida = () => {

    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalMedidas)
    const elementActive:UnidadMedida = useSelector((state: any) => state.TableReducer.elementActive)
    const [inputState, onInputChange, setInputState]: any = useInput()
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        altaBaja: false,
    });
    useEffect(() => {
        if (openModal === true) {
            setInputState({
                denominacionUnidadMedida: elementActive !== null ? elementActive.denominacion : "",
                tipoUnidadMedida: elementActive !== null ? elementActive.tipo : "",
            })
            setCheckboxStates({
                altaBaja: elementActive !== null ? elementActive.altaBaja : false,
            })
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])

    const handleSubmitModal = () => {
        //TODO: SACAR LAS FUNCIONES DE POST PUT
        if (elementActive === null) {
            axios.post(urlFetch, {
                denominacion: inputState.denominacionUnidadMedida,
                tipo: inputState.tipoUnidadMedida,
                altaBaja: checkboxStates.altaBaja
            }).then(()=>console.log(checkboxStates.tipo))
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalMedidas"))
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlFetch}/${elementActive.id}`, {
                ...elementActive,
                denominacion: inputState.denominacionUnidadMedida,
                tipo: inputState.tipoUnidadMedida,
                altaBaja: checkboxStates.altaBaja
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
                                    elementActive !== null
                                        ? "Editar Unidad De Medida"
                                        : "Crear Unidad De Medida"
                                }
                            </h1>
                            <InputGeneric
                            label="Denominacion"
                                type="text"
                                placeholder="Ingrese unidad medida"
                                name="denominacionUnidadMedida"
                                value={inputState.denominacionUnidadMedida}
                                onChange={onInputChange}
                            />
                            <InputGeneric
                            label="Abreviatura"
                                type="text"
                                placeholder="Ingrese abreviacion"
                                name="tipoUnidadMedida"
                                value={inputState.tipoUnidadMedida}
                                onChange={onInputChange}
                            />
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
                            <button onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>Cancelar</button>
                        </div>
                    </LayoutModal>

            }
        </div>
    )
}
