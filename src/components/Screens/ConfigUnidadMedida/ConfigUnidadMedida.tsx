import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric";
import { Header } from "../../ui/Header/Header";
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric";
import { useEffect } from "react";
import { ModalUnidadMedida } from "../../ui/Modals/ModalTables/ModalUnidadMedida/ModalUnidadMedida";
import { useDispatch } from "react-redux";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";
import { UnidadMedida, ColumnsUnidadMedida } from "../../../interfaces/entidades";
import { Subheader } from "../../ui/Subheader/Subheader";


const urlMedidas = `${import.meta.env.VITE_URL_API}/unidadmedidas`

export const ConfigUnidadMedida = () => {
    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsUnidadMedida = [
        ...ColumnsUnidadMedida,
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
            <Subheader />
            {/* Muestra el componente SearchGeneric con sus props */}
            <SearchGeneric label={"Unidad Medida"} placeholder={"Ingrese su categoria"} />
            {/* Muestra el componente ModalUnidadMedida */}
            <ModalUnidadMedida />
            {/* Muestra el componente ModalViewElements */}
            <ModalViewElements />
            {/* Muestra el componente GenericTable con sus props */}
            <GenericTable<UnidadMedida>
                columns={btnColumnsUnidadMedida}
                nameTable="modalMedidas"
                urlFetch={urlMedidas}
            />
        </div>
    );
};
