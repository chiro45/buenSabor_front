import { useEffect } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import { useInput, useCheckBoxInput } from '../../../../../hooks';
import { UnidadMedida } from "../../../../../interfaces/entidades";
import { InputGeneric } from "../../../InputGeneric/InputGeneric";
import "./ModalUnidadMedida.css"

const urlFetch = `${import.meta.env.VITE_URL_API}/unidadmedidas`

export const ModalUnidadMedida = () => {

    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalMedidas)
    const elementActive: UnidadMedida = useSelector((state: any) => state.TableReducer.elementActive)
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
            }).then(() => console.log(checkboxStates.tipo))
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
        <div className="containerModalUnidadMedida">
            {
                openModal === false
                    ? <button className="buttonModalUnidadMedida"
                        onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>
                        Agregar Unidad De Medida
                    </button>
                    : <LayoutModal>
                        <div className="containerFormUnidadMedida">
                            <h1>
                                {
                                    elementActive !== null
                                        ? "Editar Unidad De Medida"
                                        : "Crear Unidad De Medida"
                                }
                            </h1>
                            <InputGeneric
                                className="inputModalUnidadMedida"
                                label="Denominacion"
                                type="text"
                                placeholder="Ingrese unidad medida"
                                name="denominacionUnidadMedida"
                                value={inputState.denominacionUnidadMedida}
                                onChange={onInputChange}
                            />
                            <InputGeneric
                                className="inputModalUnidadMedida"
                                label="Abreviatura"
                                type="text"
                                placeholder="Ingrese abreviacion"
                                name="tipoUnidadMedida"
                                value={inputState.tipoUnidadMedida}
                                onChange={onInputChange}
                            />
                            <InputGeneric
                                className="inputModalUnidadMedida"
                                label="Dar Alta?"
                                onChange={onInputCheckboxChange}
                                name="altaBaja"
                                checked={checkboxStates.altaBaja}
                                value={checkboxStates.altaBaja}
                                type="checkbox" />
                            <div className="containerButtonsModalUnidadMedida">
                                <button
                                    onClick={handleSubmitModal}>
                                    {
                                        elementActive !== null
                                            ? "Editar "
                                            : "Crear "
                                    }
                                </button>
                                <button
                                    onClick={() => { dispatch(handleModalsTable("modalMedidas")) }}>
                                    Cancelar</button>
                            </div>
                        </div>
                    </LayoutModal>

            }
        </div>
    )
}
