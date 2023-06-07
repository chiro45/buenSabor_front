import { useEffect, useState } from "react";
import { useAccessToken, useCheckBoxInput, useInput, useSelectorInput } from "../../../../../hooks";
import { LayoutModal } from "../LayoutModal/LayoutModal";
import { useSelector } from "react-redux";
import { getDataTable, removeElementActiveTable } from "../../../../../Redux/Reducers/TableReducer/TableReducer";
import { handleModalsTable } from "../../../../../Redux/Reducers/ModalsReducer/ModalsReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { InputGeneric } from "../../../InputGeneric/InputGeneric";
import { startUploading } from "../../../../../functions/functions";
import Swal from "sweetalert2";
import { ButtonStandard } from "../../../Buttons/ButtonStandard/ButtonStandard";

import "./ModalArticuloManufacturado.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../../../../assets/noImage.jpg"

const urlArticuloInsumo = `${import.meta.env.VITE_URL_ARTICULOINSUMO}`,
    urlCategorias = `${import.meta.env.VITE_URL_CATEGORY}`,
    urlArticuloManufacturado = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`
export const ModalArticuloManufacturado = () => {

    const headers = useAccessToken();
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

    const parseIngredientsToBd = () => {
        const parseArr = elementActive.detalleArticuloManufacturados.map((el: any) => ({
            id: el.id,
            name: el.articuloInsumo.denominacion,
            cantidad: el.articuloInsumo.cantidad,
            medida: el.articuloInsumo.unidadMedida.tipo
        }))


        setIngredientes(parseArr)
    }

    console.log(elementActive)
    useEffect(() => {
        if (openModal === true) {
            setInputState({
                denominacion: elementActive !== null ? elementActive.denominacion : "",
                tiempoEnCocina: elementActive !== null ? elementActive.tiempoEstimadoCocina : 0,
                descripcion: elementActive !== null ? elementActive.descripcion : "",
                receta: elementActive !== null ? elementActive.receta : "",
                cantidad: 0,
                precioVenta: elementActive !== null ? elementActive.precioVenta : 0
            })
            setImageProduct({
                image: elementActive !== null ? elementActive.imagen : ""
            })
            if (elementActive !== null) {
                parseIngredientsToBd()
            }
            setSelectorsValues({
                categoria: elementActive !== null ? elementActive.categoria.denominacion : "",
                nameIngrediente: "",
            })
            setCheckboxStates({
                productoFinal: elementActive !== null ? elementActive.productoFinal : true,
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
        setIngredientes([])
    }
    const [imageProduct, setImageProduct] = useState({ image: "" })
    console.log(imageProduct)
    const handleSubmitArticuloManufacturado = () => {
        const parseIngredientes = ingredientes.map((el: any) => ({
            cantidad: el.cantidad,
            articuloInsumo: { id: el.id }
        }))
        const categoria: any = dataCategories.filter((el: any) => (el.denominacion === valuesSelector.categoria))

        const objetToSend: any = {
            tiempoEstimadoCocina: inputState.tiempoEnCocina,
            productoFinal: checkboxStates.productoFinal,
            denominacion: inputState.denominacion,
            descripcion: inputState.receta,
            receta: inputState.receta,
            precioVenta: inputState.precioVenta,
            imagen: imageProduct.image,
            altaBaja: checkboxStates.altaBaja,
            categoria: {
                id: categoria[0].id
            }
        }
        if (!checkboxStates.productoFinal) objetToSend.detalleArticuloManufacturados = parseIngredientes

        if (elementActive === null) {
            axios.post(urlArticuloManufacturado, objetToSend)
                .then(() => {
                    dispatch(getDataTable(urlArticuloManufacturado, headers))
                    handleModalState()
                })
                .catch((error) => console.error(error))
        } else {
            axios.put(`${urlArticuloManufacturado}/${elementActive.id}`, objetToSend)
                .then(() => { handleModalState() })
                .catch((error) => console.error(error))
        }
    }


    //evento que detecta que cambie
    const handleFileChange = async (e: any) => {
        const file = e.target.files[0];
        //si el file existe emtonces se produce el disparo de actualizacion
        if (file) { startUploading(file, setImageProduct) }
        else { Swal.fire("error", "No has seleccionado un archivo", "error") }

    }

    const handlePHOTO = () => { document.getElementById("fileSelector")?.click() }

    const deletePhoto = (idPhoto: string) => {
        console.log(idPhoto)
    }

    const columns = [
        { label: 'Producto', key: 'name' },
        { label: "Cantidad", key: "cantidad" },
        { label: 'Unidad Medida', key: 'medida' },
        { label: 'Eliminar', key: 'Eliminar' },
    ]

    return (
        <>
            {
                openModal === false
                    ? <ButtonStandard
                        text={"Agregar Articulo Manufacturado"}
                        handleClick={() => { handleModalState() }}
                        width={"20vw"}
                        fontSize={"1.2vw"}
                        height={"4.3vh"}
                        backgroundColor={"#0080FF"}
                        colorText={"#fff"}
                    />

                    : <LayoutModal>
                        <div className="conatinerPrincipalModalManufacturado">{/* Modal de artículo insumo */}
                            <h1>
                                {
                                    elementActive !== null
                                        ? "Editar Articulo Manufacturado"
                                        : "Crear Articulo Manufacturado"
                                }
                            </h1>
                            <div className="conatinerPrincipalModalManufacturado">
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Denominacion"
                                    type="text"
                                    name="denominacion"
                                    value={inputState.denominacion}
                                    placeholder="Denominacion"
                                    onChange={onInputChange}
                                />
                                <div className="containerImgProducto">
                                    <ButtonStandard
                                        text={"Añadir imagen"}
                                        handleClick={() => { handlePHOTO() }}
                                        width={"8vw"}
                                        fontSize={"1vw"}
                                        height={"4vh"}
                                        backgroundColor={"#77B631"}
                                        colorText={"#fff"}
                                    />
                                    <ButtonStandard
                                        text={"Eliminar imagen"}
                                        handleClick={() => { handlePHOTO() }}
                                        width={"8vw"}
                                        fontSize={"1vw"}
                                        height={"4vh"}
                                        backgroundColor={"#f00"}
                                        colorText={"#fff"}
                                    />
                                    <input id='fileSelector'
                                        type='file'
                                        name='file'
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    {
                                        imageProduct.image !== ""
                                            ? <img src={`${imageProduct.image}`} />
                                            : <img src={`${noImage}`} />
                                    }
                                </div>
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Tiempo estimado en cocina"
                                    type="number"
                                    name="tiempoEnCocina"
                                    value={inputState.tiempoEnCocina}
                                    placeholder="15 min"
                                    onChange={onInputChange}
                                />
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Precio de venta"
                                    type="number"
                                    name="precioVenta"
                                    value={inputState.precioVenta}
                                    placeholder="$400"
                                    onChange={onInputChange}
                                />
                                <div className="inputArticuloManufacturado">
                                    <label>Descripcion</label>
                                    <textarea name="descripcion" value={inputState.descripcion} onChange={onInputChange} />
                                </div>
                                <div className="inputArticuloManufacturado">
                                    <label>Receta</label>
                                    <textarea name="receta" value={inputState.receta} onChange={onInputChange} />
                                </div>

                                <div className="inputArticuloManufacturado">
                                    <label>Categoria</label>
                                    <select value={valuesSelector.categoria} name="categoria" onChange={onSelectorChange}>
                                        {dataCategories.map((el: any) => (
                                            <option key={el.denominacion}> {el.denominacion}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Alta/baja"
                                    type="checkbox"
                                    name="altaBaja"
                                    value={checkboxStates.altaBaja}
                                    placeholder="$400"
                                    onChange={onInputCheckboxChange}
                                />
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Producto Final?"
                                    type="checkbox"
                                    name="productoFinal"
                                    checked={checkboxStates.productoFinal ? true : false}
                                    value={checkboxStates.productoFinal}
                                    placeholder="$400"
                                    onChange={onInputCheckboxChange}
                                />
                            </div>
                            {
                                checkboxStates.productoFinal === false &&

                                <div style={{ width: "40vw" }}>
                                    <div className="containerAddIngredient">
                                        <InputGeneric
                                            className=""
                                            label="Cantidad"
                                            type="number"
                                            name="cantidad"
                                            value={inputState.cantidad}
                                            placeholder="100"
                                            onChange={onInputChange}
                                        />

                                        <select name="nameIngrediente" onChange={onSelectorChange}>
                                            {
                                                optionsValues.map((el: any) => (
                                                    <option>{el.denominacion}</option>
                                                ))
                                            }
                                        </select>
                                        <ButtonStandard
                                            text={"Add"}
                                            handleClick={() => { handleSubmitIngredietne() }}
                                            width={"6vw"}
                                            fontSize={"1vw"}
                                            height={"4vh"}
                                            backgroundColor={"#0080FF"}
                                            colorText={"#fff"}
                                        />
                                    </div>

                                    {
                                        ingredientes.length > 0 &&
                                        <div className="containerIngredientes">
                                            <h1>Ingredientes</h1>
                                            <table className="tabla tbl-st6">
                                                <thead className="theadTableGeneric headIngredientes">
                                                    <tr>
                                                        {/* Iteramos sobre las columnas para renderizar los encabezados */}
                                                        {columns.map((column) => (
                                                            <th key={column.key}>
                                                                {column.label}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="tbodyTableGeneric bodyIngredientes">
                                                    {/*Iteramos sobre los datos para renderizar las filas */}
                                                    {
                                                        // Validamos que haya datos en la tabla
                                                        ingredientes.length > 0 &&
                                                        ingredientes.map((el: any) => (
                                                            <tr className="" key={el.id}>
                                                                {/* Iteramos sobre las columnas para renderizar las celdas */}
                                                                {columns.map((column) => (
                                                                    <td key={column.key}>
                                                                        {/* Validamos si se especificó una función para personalizar la renderización del contenido de la celda */}
                                                                        <div className="">
                                                                            {
                                                                                column.key === "Eliminar" // Si el label de la columna es "Acciones" se renderizan los botones de acción
                                                                                    ? <ButtonStandard
                                                                                        handleClick={() => { handleDeleteElement(el.name) }}
                                                                                        width={"2vw"}
                                                                                        fontSize={"1.3vw"}
                                                                                        icon={faTrash}
                                                                                        height={"4vh"}
                                                                                        backgroundColor={"#f00"}
                                                                                        colorText={"#fff"}
                                                                                    />
                                                                                    : el[column.key]
                                                                                // Si no hay una función personalizada, se renderiza el contenido de la celda tal cual
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                        <div className="containerButtonActionsModalManufacturado">
                            <ButtonStandard
                                text={"Confirmar"}
                                handleClick={() => { handleSubmitArticuloManufacturado() }}
                                width={"10vw"}
                                fontSize={"2vw"}
                                height={"4vh"}
                                backgroundColor={"#0080FF"}
                                colorText={"#fff"}
                            />
                            <ButtonStandard
                                text={"Cancelar"}
                                handleClick={() => { handleModalState() }}
                                width={"10vw"}
                                fontSize={"2vw"}
                                height={"4vh"}
                                backgroundColor={"#f00"}
                                colorText={"#fff"}
                            />
                        </div>
                    </LayoutModal>
            }
        </>
    )
}
