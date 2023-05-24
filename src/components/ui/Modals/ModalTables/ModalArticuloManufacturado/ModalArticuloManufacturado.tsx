import { useEffect, useState } from "react";
import { useCheckBoxInput, useInput, useSelectorInput } from "../../../../../hooks";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import { useSelector } from "react-redux";
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { InputGeneric } from "../../../InputGeneric/InputGeneric";
import { startUploading } from "../../../../../functions/functions";
import Swal from "sweetalert2";

// URL base para las solicitudes HTTP
const urlArticuloInsumo = `${import.meta.env.VITE_URL_API}/articulosinsumos`,
    urlCategorias = `${import.meta.env.VITE_URL_API}/categorias`,
    urlFetch = `${import.meta.env.VITE_URL_API}/articulos_manufacturado`;

export const ModalArticuloManufacturado = () => {
    const openModal = useSelector((state: any) => state.ModalsReducer.modalArticuloManufacturado)
    // Obtiene el elemento activo de la tabla actual de Redux
    const elementActive = useSelector((state: any) => state.TableReducer.elementActive);

    const [ingredientes, setIngredientes] = useState<any>([])

    const [optionsValues, setOptionValues] = useState<any>([])

    const [dataCategories, setDataCategories] = useState([]);

    const [inputState, onInputChange, setInputState]: any = useInput({})
    // Define una variable de estado para almacenar los valores de las listas desplegables seleccionados por el usuario
    const [valuesSelector, onSelectorChange, setSelectorsValues]: any = useSelectorInput({});

    const [checkboxStates, onInputCheckboxChange, setCheckboxStates]: any = useCheckBoxInput({});

    // Obtiene los datos de las listas desplegables desde el servidor cuando el modal se abre por primera vez
    const getArticulosInsumos = () => {
        axios.get(urlArticuloInsumo)
            .then((response) => { setOptionValues(response.data) })
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
                tiempoEnCocina: elementActive !== null ? elementActive.tiempoEnCocina : "",
                descripcion: elementActive !== null ? elementActive.descripcion : "",
                receta: elementActive !== null ? elementActive.receta : "",
                cantidad: 0,
            })
            setSelectorsValues({
                categoria: elementActive !== null ? elementActive.categoria.id : "",
                nameIngrediente: elementActive !== null ? elementActive.unidadMedida.id : "",
            })
            setCheckboxStates({
                productoFinal: elementActive !== null ? elementActive.productoFinal : false,
                altaBaja: elementActive !== null ? elementActive.altaBaja : false
            })
            getArticulosInsumos()
            getDataCategories()
        }
    }, [openModal])

    const dispatch = useDispatch()

    const handleSubmitIngredietne = () => {
        const { cantidad } = inputState
        const { nameIngrediente } = valuesSelector
        const resultIngrediente = optionsValues.filter((el: any) => el.denominacion === nameIngrediente)
        console.log(resultIngrediente)

        setIngredientes([...ingredientes,
        {
            id: resultIngrediente[0].id,
            name: nameIngrediente,
            cantidad: cantidad,
            medida: resultIngrediente[0].unidadMedida.tipo
        }
        ])
        setInputState({
            ...inputState,
            cantidad: ""
        })
        setSelectorsValues({
            ...valuesSelector,
            name: ""
        })
    }

    const handleDeleteElement = (name: string) => {
        const result = ingredientes.filter((el: any) => el.name !== name)
        setIngredientes(result)
        setInputState({
            ...inputState,
            cantidad: ""
        })
        setSelectorsValues({
            ...valuesSelector,
            name: ""
        })
    }
    const handleModalState = () => {
        dispatch(handleModalsTable("modalArticuloManufacturado"))
        dispatch(removeElementActiveTable())
    }
    const [imageProduct, setImageProduct] = useState({ image: "" })
    const handleSubmitArticuloManufacturado = () => {
        const parseIngredientes = ingredientes.map((el: any) => ({
            cantidad: el.cantidad,
            articuloInsumo: { id: el.id }
        }))
        const categoria: any = dataCategories.filter((el: any) => (el.denominacion === valuesSelector.categoria))

        const objetToSehnd =
        {
            tiempoEstimadoCocina: inputState.tiempoEnCocina,
            productoFinal: true,
            denominacion: inputState.receta,
            descripcion: inputState.receta,
            receta: inputState.receta,
            precioVenta: 22.5,
            imagen: imageProduct.image,
            altaBaja: checkboxStates.altaBaja,
            detalleArticuloManufacturados: parseIngredientes,
            categoria: {
                id: categoria[0].id
            }

        }

        if (elementActive === null) {
            axios.post(urlFetch, objetToSehnd)
                .then(() => {
                    handleModalState()
                })
                .catch((error) => console.error(error))
        }
    }


    //evento que detecta que cambie
    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        //si el file existe emtonces se produce el disparo de actualizacion
        if (file) {
            startUploading(file, setImageProduct)
        } else {
            Swal.fire("error", "No has seleccionado un archivo", "error")
        }

    }

    const handlePHOTO = () => {
        document.getElementById("fileSelector")?.click()

    }

    return (
        <>
            {
                openModal === false
                    ? <button onClick={() => { handleModalState() }}>Press</button>
                    : <LayoutModal>
                        <div>{/* Modal de artículo insumo */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <InputGeneric
                                    className="inputArticuloInsumo"
                                    label="Denominacion"
                                    type="text"
                                    name="denominacion"
                                    value={inputState.denominacion}
                                    placeholder="Denominacion"
                                    onChange={onInputChange}
                                />
                                <div>
                                    <button onClick={handlePHOTO}>Añadir imagen</button>
                                    <input id='fileSelector'
                                        type='file'
                                        name='file'
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    {
                                        imageProduct.image !== "" &&
                                        <img src={`${imageProduct.image}`} width={100} />
                                    }
                                </div>
                                <InputGeneric
                                    className="inputArticuloInsumo"
                                    label="Tiempo estimado en cocina"
                                    type="number"
                                    name="tiempoEnCocina"
                                    value={inputState.tiempoEnCocina}
                                    placeholder="15 min"
                                    onChange={onInputChange}
                                />
                                <InputGeneric
                                    className="inputArticuloInsumo"
                                    label="Precio de venta"
                                    type="number"
                                    name="precioVenta"
                                    value={inputState.precioVenta}
                                    placeholder="$400"
                                    onChange={onInputChange}
                                />
                                <div>
                                    <label>Descripcion</label>
                                    <textarea name="descripcion" value={inputState.descripcion} onChange={onInputChange} />
                                </div>
                                <div>
                                    <label>Receta</label>
                                    <textarea name="receta" value={inputState.receta} onChange={onInputChange} />
                                </div>

                                <div>
                                    <label>Categoria</label>
                                    <select name="categoria" onChange={onSelectorChange}>
                                        {dataCategories.map((el: any) => (
                                            <option key={el.denominacion}> {el.denominacion}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputGeneric
                                    className="inputArticuloInsumo"
                                    label="Alta/baja"
                                    type="checkbox"
                                    name="altaBaja"
                                    value={checkboxStates.altaBaja}
                                    placeholder="$400"
                                    onChange={onInputCheckboxChange}
                                />
                                <InputGeneric
                                    className="inputArticuloInsumo"
                                    label="Producto Final?"
                                    type="checkbox"
                                    name="productoFinal"
                                    value={checkboxStates.productoFinal}
                                    placeholder="$400"
                                    onChange={onInputCheckboxChange}
                                />
                            </div>
                            {
                                checkboxStates.productoFinal === false &&

                                <div>
                                    <input
                                        type="number"
                                        name="cantidad"
                                        value={inputState.cantidad}
                                        onChange={onInputChange}
                                        placeholder="Cantidad" />
                                    <select name="nameIngrediente" onChange={onSelectorChange}>
                                        {
                                            optionsValues.map((el: any) => (
                                                <option>{el.denominacion}</option>
                                            ))
                                        }
                                    </select>
                                    <button onClick={handleSubmitIngredietne}>Add</button>

                                    <div>
                                        {
                                            ingredientes.map((el: any, i: number) => (
                                                <div key={i} style={{ display: "flex", justifyContent: "space-between", width: "40vw" }}>
                                                    <p>{el.name}</p>
                                                    <p>{el.cantidad}</p>
                                                    <p>{el.medida}</p>
                                                    <button onClick={() => { handleDeleteElement(el.name) }}>Eliminar ingrediente</button>
                                                </div>

                                            ))
                                        }
                                    </div>

                                </div>
                            }
                        </div>

                        <div>
                            <button onClick={handleSubmitArticuloManufacturado}>Confirmar</button>
                            <button onClick={() => { handleModalState() }}>Cancelar</button>
                        </div>
                    </LayoutModal>
            }
        </>
    )
}
