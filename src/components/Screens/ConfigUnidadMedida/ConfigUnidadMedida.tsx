import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, GenericTable, SearchGeneric, ModalUnidadMedida, ModalViewElements, Subheader } from "../../ui";
import { getDataTable } from "../../../Redux";
import { IColumnsUnidadMedida, IUnidadMedida } from "../../../interfaces";
import { useAccessToken } from "../../../hooks";
import './ConfigUnidadMedida.css'
import { Footer } from "../../ui/Footer/Footer";

const url = `${import.meta.env.VITE_URL_UNIDADMEDIDA}`

export const ConfigUnidadMedida = () => {
    const headers = useAccessToken();
    // Obtiene la función dispatch del store
    const dispatch = useDispatch();
    // Define las columnas de la tabla como un array de objetos con label y key
    const btnColumnsUnidadMedida = [
        ...IColumnsUnidadMedida,
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
            {/* Muestra el componente SearchGeneric con sus props */}
            <div className="Body-Modals">
                <div className="containerButtonAndSearchArticulo" >

                    <ModalUnidadMedida />
                    {/* Búsqueda genérica */}
                    <SearchGeneric
                        label={""}
                        placeholder={"Ingrese su Unidad medida"}
                    />
                </div>
                {/* Muestra el componente ModalUnidadMedida */}
                {/* Muestra el componente ModalViewElements */}
                <ModalViewElements />
                {/* Muestra el componente GenericTable con sus props */}
                <GenericTable<IUnidadMedida>
                    columns={btnColumnsUnidadMedida}
                    nameTable="modalMedidas"
                    urlFetch={url}
                />
            </div>

            <Footer />
        </div>
    );
};
