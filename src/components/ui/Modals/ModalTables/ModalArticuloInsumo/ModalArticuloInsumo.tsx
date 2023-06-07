import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { handleModalsTable, getDataTable, removeElementActiveTable } from "../../../../../Redux"
import { LayoutModal, InputGeneric } from "../../../../ui"
import { useInput, useCheckBoxInput, useSelectorInput, useAccessToken } from "../../../../../hooks"
import { IArticuloInsumo } from "../../../../../interfaces"
import { createElement, fetchGet, updateElement } from "../../../../../helpers";
import "./ModalArticuloInsumo.css"
import { ButtonStandard } from "../../../Buttons/ButtonStandard/ButtonStandard";


import { faEye } from "@fortawesome/free-solid-svg-icons"
// URL base para las solicitudes HTTP
const urlArtInsumo = `${import.meta.env.VITE_URL_ARTICULOINSUMO}`,
    urlMedidas = `${import.meta.env.VITE_URL_UNIDADMEDIDA}`,
    urlCategorias = `${import.meta.env.VITE_URL_CATEGORY}`

export const ModalArticuloInsumo = () => {
    const dispatch = useDispatch();
    const headers = useAccessToken();
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
  
    useEffect(() => {
        if (openModal === true) {
            const { denominacion, precioCompra, precioVenta, stockActual, stockMinimo, categoria, unidadMedida, altaBaja } = elementActive || {};
            
            setInputState({
                denominacion: denominacion || "",
                precioCompra: precioCompra || 0,
                precioVenta: precioVenta || 0,
                stockActual: stockActual || 0,
                stockMinimo: stockMinimo || 0,
            });
            
            setSelectorsValues({
                categoria: categoria?.id || "",
                unidadMedida: unidadMedida?.id || "",
            });
            
            setCheckboxStates({
                altaBaja: altaBaja || false,
            });
            getDataCategories()
            getDataUnidadMedidas()
        } else {
            dispatch(removeElementActiveTable())
        }
    }, [openModal])
    // Obtiene los datos de las listas desplegables desde el servidor cuando el modal se abre por primera vez
    const getDataUnidadMedidas = async () => {
        try {
            const res = await fetchGet(urlMedidas, headers);
            setDataUnidadMedidas(res);
        } catch (error) {
            console.error('Error al obtener los datos de las unidades de medidas:', error);
            // Manejo del error, como mostrar un mensaje al usuario o realizar alguna otra acción apropiada
        }

    };
    const getDataCategories = async () => {
        try {
            const res = await fetchGet(urlCategorias, headers);
            setDataCategories(res);
        } catch (error) {
            console.error('Error al obtener los datos de las categorias:', error);
            // Manejo del error, como mostrar un mensaje al usuario o realizar alguna otra acción apropiada
        }
    };
    const handleSubmitModal = () => {
        const data = {
          denominacion: inputState.denominacion,
          precioCompra: parseFloat(inputState.precioCompra),
          precioVenta: parseFloat(inputState.precioVenta),
          stockActual: parseFloat(inputState.stockActual),
          stockMinimo: parseFloat(inputState.stockMinimo),
          altaBaja: checkboxStates.altaBaja,
          categoria: {
            id: parseFloat(valuesSelector.categoria),
          },
          unidadMedida: {
            id: parseFloat(valuesSelector.unidadMedida),
          },
        };
      
        if (elementActive === null) {
          createElement(urlArtInsumo, data, headers)
            .then(() => {
              dispatch(getDataTable(urlArtInsumo, headers));
              dispatch(handleModalsTable("modalArticuloInsumo"));
            })
            .catch((error) => console.error(error));
        } else {
          updateElement(urlArtInsumo, elementActive.id, { ...elementActive, data }, headers)
            .then(() => {
              dispatch(getDataTable(urlArtInsumo, headers));
              dispatch(handleModalsTable("modalArticuloInsumo"));
            })
            .catch((error) => console.error(error));
        }
      };
      
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
                                handleClick={() => { dispatch(handleModalsTable("modalArticuloInsumo")) }}
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
