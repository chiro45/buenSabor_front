import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../../ui/Header/Header"
import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import { ModalArticuloInsumo } from "../../ui/Modals/ModalTables/ModalArticuloInsumo/ModalArticuloInsumo";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";
import { Subheader } from "../../ui/Subheader/Subheader";
import { IColumnsInsumo } from "../../../interfaces/columnsEntidades";
import { IArticuloInsumo } from "../../../interfaces/entidades";

const urlFetch = `${import.meta.env.VITE_URL_API}/articulosinsumos`

export const ConfigArticuloInsumo = () => {


    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsInsumo = [
        ...IColumnsInsumo,
        { label: "Acciones", key: "acciones" }
    ];
    const dispatch = useDispatch()

    // Utilizamos useEffect para actualizar los datos de la tabla en el estado global cuando cambia la propiedad "data"
    useEffect(() => {
        dispatch(getDataTable(urlFetch))
    }, [])

    return (
        <div>
            <Header />

            {/* Subheader */}
            <Subheader/>

            {/* Búsqueda genérica */}
            <SearchGeneric
                label={"categoria"}
                placeholder={"Ingrese su categoria"}
            />

            {/* Modal de artículo insumo */}
            <ModalArticuloInsumo />

            {/* Modal de visualización de elementos */}
            <ModalViewElements />

            {/* Tabla genérica */}
            <GenericTable<IArticuloInsumo>
                columns={btnColumnsInsumo}
                urlFetch={urlFetch}
                nameTable={"modalArticuloInsumo"}
            />

        </div>
    )
}
