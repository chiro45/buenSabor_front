import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios';
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer"
import { LayoutModal } from "../LayoutModal/LayoutModal"
import { InputGeneric } from "../../../InputGeneric/InputGeneric"
import { useInput, useCheckBoxInput, useSelectorInput } from "../../../../../hooks"
import { IArticuloInsumo } from "../../../../../interfaces/entidades"
import "./ModalArticuloInsumo.css"

// URL base para las solicitudes HTTP
const urlFetch = `${import.meta.env.VITE_URL_API}/articulosinsumos`,
    urlMedidas = `${import.meta.env.VITE_URL_API}/unidadmedidas`,
    urlCategorias = `${import.meta.env.VITE_URL_API}/categorias`
export const ModalArticuloInsumo = () => {
    const dispatch = useDispatch();

    // Obtiene el estado de Redux que indica si el modal de ArticuloInsumo está abierto o no
    const openModal = useSelector((state: any) => state.ModalsReducer.modalArticuloInsumo);

    // Obtiene el elemento activo de la tabla actual de Redux
    const elementActive: IArticuloInsumo = useSelector((state: any) => state.TableReducer.elementActive);

    // Define variables de estado para almacenar los datos de las listas desplegables
    const [dataUnidadMediads, setDataUnidadMedidas] = useState([]);
    const [dataCategories, setDataCategories] = useState([]);

    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput();

    // Define variables de estado para manejar los cambios en los campos de texto y los checkboxes del formulario
    const [inputState, onInputChange, setInputState]: any = useInput();
    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({
        esInsumo: false,
        altaBaja: false
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
                denominacion: elementActive !== null ? elementActive.denominacion : "",
                precioCompra: elementActive !== null ? elementActive.precioCompra : 0,
                precioVenta: elementActive !== null ? elementActive.precioVenta : 0,
                stockActual: elementActive !== null ? elementActive.stockActual : 0,
                stockMinimo: elementActive !== null ? elementActive.stockMinimo : 0,
            })
            setSelectorsValues({
                categoria: elementActive !== null ? elementActive.categoria.id : "",
                unidadMedida: elementActive !== null ? elementActive.unidadMedida.id : "",
            })
            setCheckboxStates({
                altaBaja: elementActive !== null ? elementActive.altaBaja : false,
            })
            getDataCategories()
            getDataUnidadMedidas()
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])



    const handleSubmitModal = () => {
        //TODO: SACAR LAS FUNCIONES DE POST PUT
        if (elementActive === null) {
            axios.post(urlFetch,
                {
                    denominacion: inputState.denominacion,
                    precioCompra: parseFloat(inputState.precioCompra),
                    precioVenta: parseFloat(inputState.precioVenta),
                    stockActual: parseFloat(inputState.stockActual),
                    stockMinimo: parseFloat(inputState.stockMinimo),
                    altaBaja: checkboxStates.altaBaja,
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
            axios.put(`${urlFetch}/${elementActive.id}`, {
                ...elementActive,
                denominacion: inputState.denominacion,
                precioCompra: parseFloat(inputState.precioCompra),
                precioVenta: parseFloat(inputState.precioVenta),
                stockActual: parseFloat(inputState.stockActual),
                stockMinimo: parseFloat(inputState.stockMinimo),
                altaBaja: checkboxStates.altaBaja,
                categoria: {
                    id: parseFloat(valuesSelector.categoria)
                },
                unidadMedida: {
                    id: parseFloat(valuesSelector.unidadMedida)
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
        <div className="containerModalArticuloInsumo">{
            openModal === false
                ? <button className="buttonModalArticulo"
                    onClick={() => { dispatch(handleModalsTable("modalArticuloInsumo")) }}>
                    Agregar Articulo / Insumo
                </button>
                : <LayoutModal>
                    <div className="containerFormArticuloInsumo">

                        <InputGeneric
                            className="inputArticuloInsumo"
                            label="Denominacion"
                            type="text"
                            name="denominacion"
                            value={inputState.denominacion}
                            placeholder="Denominacion"
                            onChange={onInputChange}
                        />
                        <InputGeneric
                            className="inputArticuloInsumo"
                            label="Precio de compra"
                            type="number"
                            name="precioCompra"
                            value={inputState.precioCompra}
                            placeholder="Precio de compra"
                            onChange={onInputChange}
                        />
                        <InputGeneric
                            className="inputArticuloInsumo"
                            label="Precio de venta"
                            type="number"
                            name="precioVenta"
                            value={inputState.precioVenta}
                            placeholder="Precio de venta"
                            onChange={onInputChange}
                        />

                        <InputGeneric
                            className="inputArticuloInsumo"
                            label="Stock Actual"
                            type="number"
                            name="stockActual"
                            value={inputState.stockActual}
                            placeholder="Stock Actual"
                            onChange={onInputChange}
                        />
                        <InputGeneric
                            className="inputArticuloInsumo"
                            label="Stock Minimo"
                            type="number"
                            name="stockMinimo"
                            value={inputState.stockMinimo}
                            placeholder="Stock Minimo"
                            onChange={onInputChange}
                        />


                        <div className="containerSelectosArticuloInsumo">
                            <label htmlFor="categoria">Categoría:</label>
                            <select onChange={onSelectorChange} name="categoria" >
                                <option>selecciona</option>
                                {
                                    dataCategories.map((el: any) => (
                                        <option
                                            value={el.id}
                                            selected={elementActive !== null && elementActive.categoria.id === el.id ? true : false}>
                                            {el.denominacion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="containerSelectosArticuloInsumo">
                            <label htmlFor="categoria">Unidad de Medida:</label>
                            <select onChange={onSelectorChange} name="unidadMedida" >
                                <option>selecciona</option>
                                {
                                    dataUnidadMediads.map((el: any) => (
                                        <option
                                            value={el.id}
                                            selected={elementActive !== null && elementActive.unidadMedida.id === el.id ? true : false}>
                                            {el.tipo}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="containerButtonsModalArticuloInsumo">
                            <button
                                onClick={handleSubmitModal}>
                                {
                                    elementActive !== null
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
