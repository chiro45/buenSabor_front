import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccessToken } from "../../../hooks";
import { getDataTable } from "../../../Redux";
import { IColumnsInsumo, IArticuloInsumo } from "../../../interfaces";
import { Header, GenericTable, SearchGeneric, ModalArticuloInsumo, ModalViewElements, Subheader } from "../../ui";
import "./ConfigArticuloInsumo.css"
import { Footer } from "../../ui/Footer/Footer";
const url = `${import.meta.env.VITE_URL_ARTICULOINSUMO}`



export const ConfigArticuloInsumo = () => {

    const headers = useAccessToken();
    const dispatch = useDispatch()

    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsInsumo = [
        ...IColumnsInsumo,
        { label: "Acciones", key: "acciones" }
    ];

    // Utilizamos useEffect para actualizar los datos de la tabla en el estado global cuando cambia la propiedad "data"
    useEffect(() => {
        dispatch(getDataTable(url, headers))
    }, [dispatch])

    return (
        <div>
            <Header />

            {/* Subheader */}
            <Subheader />
            <div className="Body-Modals">
                <div className="containerButtonAndSearchArticulo" >
                    <ModalArticuloInsumo />
                    {/* Búsqueda genérica */}
                    <SearchGeneric
                        label={""}
                        placeholder={"Ingrese su articulo"}
                    />
                </div>

                {/* Modal de visualización de elementos */}
                <ModalViewElements />

                {/* Tabla genérica */}
                <GenericTable<IArticuloInsumo>
                    columns={btnColumnsInsumo}
                    urlFetch={url}
                    nameTable={"modalArticuloInsumo"}
                />
            </div>
            {/* Búsqueda genérica */}

            <Footer />
        </div>
    )
}
