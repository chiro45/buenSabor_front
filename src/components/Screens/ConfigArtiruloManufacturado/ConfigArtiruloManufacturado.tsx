import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { Header, SearchGeneric, Subheader, GenericTable, ModalArticuloManufacturado, ModalViewElements } from "../../ui"
import { IColumnsArticuloManufacturado } from "../../../interfaces"
import { getDataTable } from "../../../Redux"
import "./ConfigArtiruloManufacturado.css"
import { Footer } from "../../ui/Footer/Footer"
import { useAuth0 } from "@auth0/auth0-react"

const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`


export const ConfigArtiruloManufacturado = () => {
    // Obtiene la función dispatch del store
    const dispatch = useDispatch();

    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsArticuloManufacturado = [
        ...IColumnsArticuloManufacturado,
        { label: "Acciones", key: "acciones" }
    ];

    // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
    const {getAccessTokenSilently} = useAuth0();
    // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
    const dispatchData = async () => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        dispatch(getDataTable(url, headers));
    }
    useEffect(() => {
        dispatchData()
    }, [dispatch]);



    return (
        <div>
            <Header />

            {/* Subheader */}
            <Subheader />

            <div className="Body-Modals">
                <div className="containerButtonAndSearchArticulo" >
                    <ModalArticuloManufacturado />
                    {/* Búsqueda genérica
                    <SearchGeneric
                        label={""}
                        placeholder={"Ingrese su articulo"}
                    /> */}
                </div>

                <ModalViewElements />
                {/* Tabla genérica */}
                <GenericTable<any>
                    columns={btnColumnsArticuloManufacturado}
                    urlFetch={url}
                    nameTable={"modalArticuloManufacturado"}
                />
            </div>

            <Footer />
        </div>
    )
}
