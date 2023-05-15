import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import "./ConfigCategory.css"
import { ModalCategoria } from "../../ui/Modals/ModalTables/ModalCategoria/ModalCategoria";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";

interface Categoria {
    id: number;
    denominacion: string;
    parent: Parent;

}

interface Parent {
        id: number,
        denominacion?: string,
        parent?: {}
}
const urlMedidas = "http://localhost:9000/categorias"

export const ConfigCategory = () => {

    const columnsArtInsumo = [
        { label: 'Id', key: 'id' },
        { label: 'Denominacion', key: 'denominacion' },
        { label: "Categoria Padre", key: "parent", render: (parent: Parent) => parent !== null ? parent.denominacion : "Padre" },
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

            <GenericTable<Categoria> 
            columns={columnsArtInsumo}  
            urlFetch={urlMedidas} 
            nameTable={"modalcategoria"}
            />

        </div>
    )
}
