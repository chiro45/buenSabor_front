import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useInput } from "../../../../../hooks/useInput"
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer"
import { useEffect, useState } from "react"
import { LayoutModal } from "../LayoutModal/LayoutModal"
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import axios from 'axios';
import { useCheckBoxInput } from "../../../../../hooks/useCheckBoxInput"
import { useSelectorInput } from "../../../../../hooks/useSelectorInput"

// URL base para las solicitudes HTTP
const urlFetch = `${import.meta.env.VITE_URL_API}/articulosinsumos`,
    urlMedidas = `${import.meta.env.VITE_URL_API}/unidadmedidas`,
    urlCategorias = `${import.meta.env.VITE_URL_API}/categorias`
export const ModalArticuloInsumo = () => {
    const dispatch = useDispatch();

    // Obtiene el estado de Redux que indica si el modal de ArticuloInsumo está abierto o no
    const openModal = useSelector((state: any) => state.ModalsReducer.modalArticuloInsumo);

    // Obtiene el elemento activo de la tabla actual de Redux
    const elemetActive = useSelector((state: any) => state.TableReducer.elementActive);

    // Define variables de estado para almacenar los datos de las listas desplegables
    const [dataUnidadMediads, setDataUnidadMedidas] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);

    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput();

    // Define variables de estado para manejar los cambios en los campos de texto y los checkboxes del formulario
    const [inputState, onInputChange, setInputState]: any = useInput();
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        esInsumo: false,
    });

    // Obtiene los datos de las listas desplegables desde el servidor cuando el modal se abre por primera vez
    const getDataUnidadMedidas = () => {
        axios.get(urlMedidas)
            .then((response) => { setDataUnidadMedidas(response.data) })
            .catch((error) => console.error(error))
    };
    const getDataCategories = () => {
        axios.get(urlCategorias)
            .then((response) => { setDataCategories(response.data) })
            .catch((error) => console.error(error))
    };



    useEffect(() => {
        if (openModal === true) {
            setInputState({
                denominacion: elemetActive !== null ? elemetActive.denominacion : "",
                precioCompra: elemetActive !== null ? elemetActive.precioCompra : 0,
                precioVenta: elemetActive !== null ? elemetActive.precioVenta : 0,
                stockActual: elemetActive !== null ? elemetActive.stockActual : 0,
                stockMinimo: elemetActive !== null ? elemetActive.stockMinimo : 0
            })
            setSelectorsValues({
                categoria: elemetActive !== null ? elemetActive.categoria.id : "",
                unidadMedida: elemetActive !== null ? elemetActive.unidadMedida.id : "",
            })
            setCheckboxStates({
                esInsumo: elemetActive !== null ? elemetActive.esInsumo : false,
            })
            getDataCategories()
            getDataUnidadMedidas()
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])



    const handleSubmitModal = () => {
        //TODO: SACAR LAS FUNCIONES DE POST PUT
        if (elemetActive === null) {
            axios.post(urlFetch,
                {
                    denominacion: inputState.denominacion,
                    esInsumo: checkboxStates.esInsumo,
                    precioCompra: parseFloat(inputState.precioCompra),
                    precioVenta: parseFloat(inputState.precioVenta),
                    stockActual: parseFloat(inputState.stockActual),
                    stockMinimo: parseFloat(inputState.stockMinimo),
                    categoria: {
                        id: parseFloat(valuesSelector.categoria)
                    },
                    unidadMedida: {
                        id: parseFloat(valuesSelector.unidadMedida)
                    }
                }
            )
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalArticuloInsumo"))
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlFetch}/${elemetActive.id}`, {
                ...elemetActive,
                denominacion: inputState.denominacion,
                esInsumo: checkboxStates.esInsumo,
                precioCompra: parseFloat(inputState.precioCompra),
                precioVenta: parseFloat(inputState.precioVenta),
                stockActual: parseFloat(inputState.stockActual),
                stockMinimo: parseFloat(inputState.stockMinimo),
                categoria: {
                    id: parseFloat(valuesSelector.categoria)
                },
                unidadMedida: {
                    id: parseFloat(valuesSelector.unidadMedida)
                },
                producto :{
                    id: parseFloat(elemetActive.id)
                }

            })
                .then(() => {
                    dispatch(getDataTable(urlFetch))
                    dispatch(handleModalsTable("modalArticuloInsumo"))
                })
                .catch((error) => console.error(error))
        }
    }

    return (
        <div>{
            openModal === false
                ? <button onClick={() => { dispatch(handleModalsTable("modalArticuloInsumo")) }}>Modal Unidad Medida</button>
                : <LayoutModal>
                    <div>
                        <label>Denominacion</label>
                        <input type="text"
                            name="denominacion"
                            value={inputState.denominacion}
                            placeholder="Denominacion"
                            onChange={onInputChange}
                        />
                        <label>Precio de compra</label>
                        <input
                            type="number"
                            name="precioCompra"
                            value={inputState.precioCompra}
                            placeholder="Precio de compra"
                            onChange={onInputChange}
                        />
                        <label>Precio de venta</label>
                        <input
                            type="number"
                            name="precioVenta"
                            value={inputState.precioVenta}
                            placeholder="Precio de venta"
                            onChange={onInputChange}
                        />
                        <label>Stock Actual</label>
                        <input
                            type="number"
                            name="stockActual"
                            value={inputState.stockActual}
                            placeholder="Stock Actual"
                            onChange={onInputChange}
                        />
                        <label>Stock Minimo</label>
                        <input
                            type="number"
                            name="stockMinimo"
                            value={inputState.stockMinimo}
                            placeholder="Stock Minimo"
                            onChange={onInputChange}
                        />
                        <label>¿Es insumo?</label>
                        <input
                            onChange={onInputCheckboxChange}
                            name="esInsumo"
                            checked={checkboxStates.esInsumo}
                            value={checkboxStates.esInsumo}
                            type="checkbox" />
                        <select onChange={onSelectorChange} name="categoria" >
                            <option>selecciona</option>
                            {
                                dataCategories.map((el: any) => (
                                    <option
                                        value={el.id}
                                        selected={elemetActive !== null && elemetActive.categoria.id === el.id ? true : false}>
                                        {el.denominacion}
                                    </option>
                                ))
                            }
                        </select>

                        <select onChange={onSelectorChange} name="unidadMedida" >
                            <option>selecciona</option>
                            {
                                dataUnidadMediads.map((el: any) => (
                                    <option
                                        value={el.id}
                                        selected={elemetActive !== null && elemetActive.unidadMedida.id === el.id ? true : false}>
                                        {el.tipo}
                                    </option>
                                ))
                            }
                        </select>
                        <div>
                            <button
                                onClick={handleSubmitModal}>
                                {
                                    elemetActive !== null
                                        ? "Editar "
                                        : "Crear "
                                }
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(handleModalsTable("modalArticuloInsumo"))
                                }}>Cancelar</button>
                        </div>
                    </div>
                </LayoutModal>
        }
        </div>
    )
}
