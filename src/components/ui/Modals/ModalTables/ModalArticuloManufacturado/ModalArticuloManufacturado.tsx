import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAccessToken, useCheckBoxInput, useInput, useSelectorInput } from "../../../../../hooks";
import { getDataTable, removeElementActiveTable, handleModalsTable } from "../../../../../Redux";
import { InputGeneric, ButtonStandard, LayoutModal } from "../../../../ui";
import { startUploading } from "../../../../../functions/functions";
import { createElement, getElementSetState, updateElement } from "../../../../../helpers";
import Swal from "sweetalert2";
import noImage from "../../../../../assets/noImage.jpg"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ModalArticuloManufacturado.css"

const
    urlArticuloInsumo = `${import.meta.env.VITE_URL_ARTICULOINSUMO}`,
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

    const getArticulosInsumos = () => getElementSetState(urlArticuloInsumo, headers, setOptionValues);
    const getDataCategories = () => getElementSetState(urlCategorias, headers, setDataCategories);


    const parseIngredientsToBd = () => {
        const parseArr = elementActive.detalleArticuloManufacturados.map((el: any) => ({
            id: el.articuloInsumo.id,
            name: el.articuloInsumo.denominacion,
            cantidad: el.cantidad,
            medida: el.articuloInsumo.unidadMedida.tipo,
            altaBaja: el.articuloInsumo.altaBaja,
        }))
        setIngredientes(parseArr)
    }

    useEffect(() => {
        if (openModal === true) {
            const {
                denominacion,
                tiempoEstimadoCocina,
                descripcion,
                receta,
                precioCompra,
                precioVenta,
                categoria,
                imagen,
                productoFinal,
                stockActual,
                stockMinimo,
                altaBaja
            } = elementActive || {};
            setInputState({
                denominacion: denominacion || "",
                tiempoEnCocina: tiempoEstimadoCocina || 0,
                descripcion: descripcion || "",
                receta: receta || "",
                cantidad: 0,
                precioCompra: precioCompra || 0,
                precioVenta: precioVenta || 0,
                stockActual: stockActual || 0,
                stockMinimo: stockMinimo || 0,
            });

            setImageProduct({
                image: imagen || ""
            });

            if (elementActive !== null) {
                parseIngredientsToBd();
            }

            setSelectorsValues({
                categoria: categoria?.denominacion || "",
                nameIngrediente: ""
            });

            setCheckboxStates({
                productoFinal: productoFinal !== undefined ? productoFinal : true,
                altaBaja: altaBaja !== undefined ? altaBaja : false
            });
            getArticulosInsumos();
            getDataCategories();
        }
    }, [openModal]);

    const dispatch = useDispatch()

    const handleSubmitIngrediente = () => {
        const { cantidad } = inputState;
        const { nameIngrediente } = valuesSelector;
        const resultIngrediente = optionsValues.find((el: any) => el.denominacion === nameIngrediente);
        if (resultIngrediente) {
            const { id, unidadMedida,  } = resultIngrediente;
            const { tipo } = unidadMedida;
            setIngredientes([
                ...ingredientes,
                {
                    id,
                    name: nameIngrediente,
                    cantidad,
                    medida: tipo
                }
            ]);

            setInputState({
                ...inputState,
                cantidad: ""
            });

            setSelectorsValues({
                ...valuesSelector,
                nameIngrediente: ""
            });
        }
    };


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
            precioCompra: inputState.precioCompra,
            precioVenta: inputState.precioVenta,
            imagen: imageProduct.image,
            altaBaja: checkboxStates.altaBaja,
            stockActual: inputState.stockActual,
            stockMinimo: inputState.stockMinimo,
            categoria: {
                id: categoria[0].id
            },
            detalleArticuloManufacturados: ingredientes
        }
        if (!checkboxStates.productoFinal) objetToSend.detalleArticuloManufacturados = parseIngredientes

        if (elementActive === null) {
            createElement(urlArticuloManufacturado, objetToSend, headers)
                .then(() => {
                    dispatch(getDataTable(urlArticuloManufacturado, headers))
                    handleModalState()
                })
                .catch((error) => console.error(error))
        } else {
            updateElement(urlArticuloManufacturado, elementActive.id, objetToSend, headers)

                .then(() => {
                    dispatch(getDataTable(urlArticuloManufacturado, headers))
                    handleModalState()
                })
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
        {
            label: 'Alta/Baja',
            key: 'altaBaja',
            render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
        },
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
                                    label="Tiempo preparacion"
                                    type="number"
                                    name="tiempoEnCocina"
                                    value={inputState.tiempoEnCocina}
                                    placeholder="15 min"
                                    onChange={onInputChange}
                                />
                                {checkboxStates.productoFinal &&

                                    <InputGeneric
                                        className="inputArticuloManufacturado"
                                        label="Precio Compra"
                                        type="number"
                                        name="precioCompra"
                                        value={inputState.precioCompra}
                                        placeholder="$200"
                                        onChange={onInputChange}
                                    />}
                                {checkboxStates.productoFinal === false &&

                                    <InputGeneric
                                        className="inputArticuloManufacturado"
                                        label="Precio Compra"
                                        type="number"
                                        name="precioCompra"
                                        value={inputState.precioCompra}
                                        placeholder="$200"
                                        onChange={onInputChange}
                                    />}
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Precio Venta"
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
                                        <option >Selecciona</option>
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
                                    checked={checkboxStates.altaBaja}
                                    placeholder="$400"
                                    onChange={onInputCheckboxChange}
                                />
                                {checkboxStates.productoFinal &&

                                    <InputGeneric
                                        className="inputArticuloManufacturado"
                                        label="Stock Actual"
                                        type="number"
                                        name="stockActual"
                                        value={inputState.stockActual}
                                        placeholder="20"
                                        onChange={onInputChange}
                                    />}
                                {checkboxStates.productoFinal &&
                                    <InputGeneric
                                        className="inputArticuloManufacturado"
                                        label="Stock Minimo"
                                        type="number"
                                        name="stockMinimo"
                                        value={inputState.stockMinimo}
                                        placeholder="5"
                                        onChange={onInputChange}
                                    />
                                }
                                <InputGeneric
                                    className="inputArticuloManufacturado"
                                    label="Producto Final?"
                                    type="checkbox"
                                    name="productoFinal"
                                    checked={checkboxStates.productoFinal}
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
                                            <option >Selecciona</option>
                                            {
                                                optionsValues.map((el: any) => (
                                                    <option>{el.denominacion}</option>
                                                ))
                                            }
                                        </select>
                                        <ButtonStandard
                                            text={"Add"}
                                            handleClick={() => { handleSubmitIngrediente() }}
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
                                                                    <td key={column.key} >
                                                                        {/* Validamos si se especificó una función para personalizar la renderización del contenido de la celda */}
                                                                        <div className="">
                                                                            {
                                                                                column.render
                                                                                    ? column.render(el[column.key])
                                                                                    : column.key === "Eliminar" // Si el label de la columna es "Acciones" se renderizan los botones de acción
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
                                text={
                                    elementActive !== null
                                        ? "Editar "
                                        : "Crear "
                                }
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
