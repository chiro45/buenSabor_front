import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccessToken } from "../../../hooks";
import { getDataTable } from "../../../Redux";
import { IColumnsCategoria, ICategoria } from "../../../interfaces";
import { GenericTable, Header, SearchGeneric, ModalCategoria, Subheader, ModalViewElements } from "../../ui"
import "./ConfigCategory.css"
import { Footer } from "../../ui/Footer/Footer";

const url = `${import.meta.env.VITE_URL_CATEGORY}`

export const ConfigCategory = () => {

    const headers = useAccessToken();
    // Obtiene la función dispatch del store
    const dispatch = useDispatch();
    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsCategoria = [
        ...IColumnsCategoria,
        { label: "Acciones", key: "acciones" }
    ];

    // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
    useEffect(() => {
        dispatch(getDataTable(url, headers));
    }, [dispatch]);


    return (
        <div>
            <Header />
            <Subheader />
            <div className="Body-Modals">
                <div className="containerButtonAndSearchArticulo" >

                    <ModalCategoria />
                    {/* Búsqueda genérica */}
                    <SearchGeneric
                        label={""}
                        placeholder={"Ingrese su categoria"}
                    />
                </div>
                <ModalViewElements />
                <GenericTable<ICategoria>
                    columns={btnColumnsCategoria}
                    urlFetch={url}
                    nameTable={"modalCategoria"}
                />
            </div>


            <Footer />
        </div>
    )
}
