import { ICategoria, IUnidadMedida } from "../entidades";


export const IColumnsInsumo = [
    { label: 'Denominación', key: 'denominacion' },
    { label: 'Precio Compra', key: 'precioCompra' },
    { label: 'Precio Venta', key: 'precioVenta' },
    { label: 'Stock Actual', key: 'stockActual' },
    { label: 'Stock Mínimo', key: 'stockMinimo' },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
    { label: 'Categoria', key: 'categoria', render: (categoria: ICategoria) => categoria.denominacion },
    { label: 'Unidad de Medida', key: 'unidadMedida', render: (unidadMedida: IUnidadMedida) => unidadMedida.tipo },
];
