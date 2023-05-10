import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import "./ConfigCategory.css"

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
export interface Producto {

}
export interface Categoria {

}


export const ConfigUnidadMedida = () => {

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

    const dataArtInsumo: ArticuloInsumo[] = [
        {
            id: 1,
            denominacion: 'denominacion_value2',
            esInsumo: true,
            precioCompra: 10.99,
            precioVenta: 19.99,
            stockActual: 100.0,
            stockMinimo: 50.0,
            unidadMedida: {
                id: 1,
                tipo: 'tipo_value',
            }
        },
        {
            id: 1,
            denominacion: 'denominacion_value2',
            esInsumo: false,
            precioCompra: 10.99,
            precioVenta: 19.99,
            stockActual: 100.0,
            stockMinimo: 50.0,
            unidadMedida: {
                id: 1,
                tipo: 'tipo_value',
            }
        },
        {
            id: 1,
            denominacion: 'denominacion_value2',
            esInsumo: true,
            precioCompra: 10.99,
            precioVenta: 19.99,
            stockActual: 100.0,
            stockMinimo: 50.0,
            unidadMedida: {
                id: 1,
                tipo: 'tipo_value',
            }
        }

    ];

    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"categoria"} placeholder={"Ingrese su categoria"} />
            <div>
                <button>Agregar Categoria</button>
            </div>

            <GenericTable<ArticuloInsumo> columns={columnsArtInsumo} data={dataArtInsumo} />

        </div>
    )
}
