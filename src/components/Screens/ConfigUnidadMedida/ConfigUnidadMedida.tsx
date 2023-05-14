import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric";
import { Header } from "../../ui/Header/Header";
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric";
import { useEffect } from "react";
import { ModalUnidadMedida } from "../../ui/Modals/ModalTables/ModalUnidadMedida/ModalUnidadMedida";
import { useDispatch } from "react-redux";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";

const urlMedidas = "http://localhost:9000/unidadmedidas";

// Define la interfaz de UnidadMedida con sus propiedades y tipos
interface UnidadMedida {
    id: number;
    tipo: string;
}

export const ConfigUnidadMedida = () => {
    // Define las columnas de la tabla como un array de objetos con label y key
    const columnsArtInsumo = [
        { label: 'Tipo', key: 'tipo' },
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
            {/* Muestra el componente SearchGeneric con sus props */}
            <SearchGeneric label={"Unidad Medida"} placeholder={"Ingrese su categoria"} />
            {/* Muestra el componente ModalUnidadMedida */}
            <ModalUnidadMedida />
            {/* Muestra el componente ModalViewElements */}
            <ModalViewElements />
            {/* Muestra el componente GenericTable con sus props */}
            <GenericTable<UnidadMedida>
                columns={columnsArtInsumo}
                nameTable="modalMedidas"
                urlFetch={urlMedidas}
            />
        </div>
    );
};
