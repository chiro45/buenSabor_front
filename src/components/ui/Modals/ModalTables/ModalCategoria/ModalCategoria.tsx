import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useInput, useCheckBoxInput, useSelectorInput, useAccessToken } from "../../../../../hooks"
import { handleModalsTable, getDataTable, removeElementActiveTable } from "../../../../../Redux"
import { createElement, fetchGet, getElementSetState, updateElement } from "../../../../../helpers";
import { LayoutModal, InputGeneric } from "../../../../ui"
import { ICategoria } from "../../../../../interfaces"
import "./ModalCategoria.css"

const urlFetch = `${import.meta.env.VITE_URL_CATEGORY}`

export const ModalCategoria = () => {
    const headers = useAccessToken();
    const dispatch = useDispatch()
    const openModal = useSelector((state: any) => state.ModalsReducer.modalCategoria)
    const elementActive: ICategoria = useSelector((state: any) => state.TableReducer.elementActive)
    const [dataCategories, setDataCategories] = useState([]);
    const [inputState, onInputChange, setInputState]: any = useInput()
    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput();
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        altaBaja: false,
    });
    const getDataCategories = () => getElementSetState(urlFetch, headers, setDataCategories);

    useEffect(() => {
        if (openModal === true) {
            const { denominacion, parent, altaBaja } = elementActive || {};
            setInputState({ denominacion: denominacion || "" });
            setSelectorsValues({ categoria: parent?.id || "" });
            setCheckboxStates({ altaBaja: altaBaja !== undefined ? altaBaja : false });
            getDataCategories()
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])


    const handleSubmitModal = () => {
        const data = {
            parent: valuesSelector.categoria !== "" ? { id: parseInt(valuesSelector.categoria) } : null,
            denominacion: inputState.denominacion,
            altaBaja: checkboxStates.altaBaja,
        };

        if (elementActive === null) {
            createElement(urlFetch, data, headers)
                .then(() => {
                    dispatch(getDataTable(urlFetch, headers));
                    dispatch(handleModalsTable("modalCategoria"));
                })
                .catch((error) => console.error(error));
        } else {
            updateElement(urlFetch, elementActive.id, data, headers)
                .then(() => {
                    dispatch(getDataTable(urlFetch, headers));
                    dispatch(handleModalsTable("modalCategoria"));
                })
                .catch((error) => console.error(error));
        }
    };



    return (
        <div className="containerModalCategoria">
            {
                openModal === false
                    ? <button
                        className="buttonModalCategoria"
                        onClick={() => { dispatch(handleModalsTable("modalCategoria")) }}>
                        Agregar Categoria
                    </button>
                    : <LayoutModal>
                        <div className="containerFormCategoria">
                            <h1>
                                {
                                    elementActive !== null
                                        ? "Editar Categoria"
                                        : "Crear Categoria"
                                }
                            </h1>
                            <InputGeneric
                                className="inputCategoria"
                                type="text"
                                label="Denominacion"
                                placeholder="Ingrese denominacion de la Categoria"
                                name="denominacion"
                                value={inputState.denominacion}
                                onChange={onInputChange}
                            />
                            <select className="containerSelectorCategoria" onChange={onSelectorChange} name="categoria" >
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
                                className="inputCategoria"
                                label="Dar Alta?"
                                onChange={onInputCheckboxChange}
                                name="altaBaja"
                                checked={checkboxStates.altaBaja}
                                value={checkboxStates.altaBaja}
                                type="checkbox" />
                            <div className="containerButtonsModalCategoria">
                                <button
                                    onClick={handleSubmitModal}>
                                    {
                                        elementActive !== null
                                            ? "Editar "
                                            : "Crear "
                                    }
                                </button>
                                <button
                                    onClick={() => { dispatch(handleModalsTable("modalCategoria")) }}
                                >Cancelar
                                </button>
                            </div>
                        </div>
                    </LayoutModal>

            }
        </div >
    )
}
