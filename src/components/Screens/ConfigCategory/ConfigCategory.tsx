import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccessToken } from "../../../hooks";
import { getDataTable } from "../../../Redux";
import { IColumnsCategoria, ICategoria } from "../../../interfaces";
import { GenericTable, Header,SearchGeneric, ModalCategoria, Subheader, ModalViewElements } from "../../ui"
import "./ConfigCategory.css"

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
            <Subheader/>
            <SearchGeneric label={"categoria"} placeholder={"Ingrese su categoria"} />
            <ModalCategoria />
            <ModalViewElements />
            <GenericTable<ICategoria>
                columns={btnColumnsCategoria}
                urlFetch={url}
                nameTable={"modalCategoria"}
            />

        </div>
    )
}
