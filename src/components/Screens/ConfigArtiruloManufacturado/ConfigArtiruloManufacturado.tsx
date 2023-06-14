import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { Header, SearchGeneric, Subheader, GenericTable, ModalArticuloManufacturado, ModalViewElements } from "../../ui"
import { IColumnsArticuloManufacturado } from "../../../interfaces"
import { getDataTable } from "../../../Redux"
import { useAccessToken } from "../../../hooks"
import "./ConfigArtiruloManufacturado.css"

const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`


export const ConfigArtiruloManufacturado = () => {
    const headers = useAccessToken();
    // Obtiene la función dispatch del store
    const dispatch = useDispatch();

    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsArticuloManufacturado = [
        ...IColumnsArticuloManufacturado,
        { label: "Acciones", key: "acciones" }
    ];

    // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
    useEffect(() => {
        dispatch(getDataTable(url,headers));
    }, [dispatch]);



    return (
        <div>
            <Header />

            {/* Subheader */}
            <Subheader />

            <div className="containerButtonAndSearchArticulo" >
                <ModalArticuloManufacturado />
                {/* Búsqueda genérica */}
                <SearchGeneric
                    label={""}
                    placeholder={"Ingrese su articulo"}
                />
            </div>

            <ModalViewElements />
            {/* Tabla genérica */}
            <GenericTable<any>
                columns={btnColumnsArticuloManufacturado}
                urlFetch={url}
                nameTable={"modalArticuloManufacturado"}
            />

        </div>
    )
}
