import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import { ModalArticuloInsumo } from "../../ui/Modals/ModalTables/ModalArticuliInsumo/ModalArticuloInsumo";
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";

interface ArticuloInsumo {
    id: number;
    denominacion: string;
    esInsumo: boolean;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    unidadMedida: UnidadMedida,
}

export interface UnidadMedida {
    id: number;
    tipo: string;
}

const urlMedidas = `${import.meta.env.VITE_URL_API}/articulosinsumos`

export const ConfigArticuloInsumo = () => {

    // Definimos las columnas que va a tener la tabla
    const columnsArtInsumo = [
        { label: 'Denominación', key: 'denominacion' },
        { label: 'Es Insumo', key: 'esInsumo', isTrueOrFalse: (insumoT: boolean) => ((insumoT === true) ? "Insumo" : "NoInsumo") },
        { label: 'Precio Compra', key: 'precioCompra' },
        { label: 'Precio Venta', key: 'precioVenta' },
        { label: 'Stock Actual', key: 'stockActual' },
        { label: 'Stock Mínimo', key: 'stockMinimo' },
        { label: 'Unidad de Medida', key: 'unidadMedida', render: (unidadMedida: UnidadMedida) => unidadMedida.tipo },
        { label: "Acciones", key: "acciones" }
    ];

    const dispatch = useDispatch()

    // Utilizamos useEffect para actualizar los datos de la tabla en el estado global cuando cambia la propiedad "data"
    useEffect(() => {
        dispatch(getDataTable(urlMedidas))
    }, [])

    return (
        <div>
            <Header />

            {/* Subheader */}
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>

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
            <GenericTable<ArticuloInsumo>
                columns={columnsArtInsumo}
                urlFetch={urlMedidas}
                nameTable={"modalArticuloInsumo"}
            />

        </div>
    )
}
