import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { handleModalsTable, getDataTable, removeElementActiveTable } from "../../../../../Redux";
import { LayoutModal, InputGeneric, ButtonStandard } from "../../../../ui"
import { useInput, useCheckBoxInput, useAccessToken } from '../../../../../hooks';
import { IUnidadMedida } from "../../../../../interfaces";
import { createElement, updateElement } from "../../../../../helpers";
import "./ModalUnidadMedida.css"

const urlFetch = `${import.meta.env.VITE_URL_UNIDADMEDIDA}`

export const ModalUnidadMedida = () => {

    const dispatch = useDispatch()
    const headers = useAccessToken();
    const openModal = useSelector((state: any) => state.ModalsReducer.modalMedidas)
    const elementActive: IUnidadMedida = useSelector((state: any) => state.TableReducer.elementActive)
    const [inputState, onInputChange, setInputState]: any = useInput()
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        altaBaja: false,
    });

    useEffect(() => {
        if (openModal) {
            const { denominacion, altaBaja, tipo } = elementActive || {};
            setInputState({
                denominacionUnidadMedida: denominacion || "",
                tipoUnidadMedida: tipo || "",
            });
            setCheckboxStates({ altaBaja: altaBaja !== undefined ? altaBaja : false, });
        } else {
            dispatch(removeElementActiveTable());
        }
    }, [openModal]);

    const handleSubmitModal = () => {
        const data = {
            denominacion: inputState.denominacionUnidadMedida,
            tipo: inputState.tipoUnidadMedida,
            altaBaja: checkboxStates.altaBaja,
        };

        if (elementActive === null) {
            createElement(urlFetch, data, headers)
                .then(() => {
                    dispatch(getDataTable(urlFetch, headers));
                    dispatch(handleModalsTable("modalMedidas"));
                })
                .catch((error) => console.error(error));
        } else {
            updateElement(urlFetch, elementActive.id, data, headers)
                .then(() => {
                    dispatch(getDataTable(urlFetch, headers));
                    dispatch(handleModalsTable("modalMedidas"));
                })
                .catch((error) => console.error(error));
        }
    };
    return (
        <div className="containerModalUnidadMedida">
            {
                openModal === false
                    ?
                    <ButtonStandard
                        text={"Agregar Articulo / Insumo"}
                        handleClick={() => { dispatch(handleModalsTable("modalMedidas")) }}
                        width={"20vw"}
                        fontSize={"1.2vw"}
                        height={"4.3vh"}
                        backgroundColor={"#0080FF"}
                        colorText={"#fff"}
                    />

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
                                <ButtonStandard
                                    text=
                                    {
                                        elementActive !== null
                                            ? "Editar "
                                            : "Crear "
                                    }
                                    handleClick={handleSubmitModal}
                                    width={"10vw"}
                                    height={"4vh"}
                                    backgroundColor={"#0080FF"}
                                    colorText={"#fff"}
                                    fontSize={"2vw"}
                                />
                                <ButtonStandard
                                    text={"Cancelar"}
                                    handleClick={() => { dispatch(handleModalsTable("modalMedidas")) }}
                                    width={"10vw"}
                                    fontSize={"2vw"}
                                    height={"4vh"}
                                    backgroundColor={"#f00"}
                                    colorText={"#fff"}
                                />

                            </div>
                        </div>
                    </LayoutModal>

            }
        </div>
    )
}
