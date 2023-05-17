import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import "./ConfigCategory.css"
import { ModalCategoria } from "../../ui/Modals/ModalTables/ModalCategoria/ModalCategoria";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";
import { Categoria, ColumnsCategoria } from "../../../interfaces/entidades";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";

const urlMedidas = `${import.meta.env.VITE_URL_API}/categorias`

export const ConfigCategory = () => {

    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsCategoria = [
        ...ColumnsCategoria,
        { label: "Acciones", key: "acciones" }
    ];
    // Obtiene la función dispatch del store
    const dispatch = useDispatch();

    // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
    useEffect(() => {
        dispatch(getDataTable(urlMedidas));
    }, [dispatch]);


    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"categoria"} placeholder={"Ingrese su categoria"} />
            <ModalCategoria />
            <ModalViewElements />
            <GenericTable<Categoria>
                columns={btnColumnsCategoria}
                urlFetch={urlMedidas}
                nameTable={"modalCategoria"}
            />

        </div>
    )
}
