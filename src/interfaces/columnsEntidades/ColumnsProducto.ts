import { Categoria, UnidadMedida } from "../entidades";


export const ColumnsProducto = [
    { label: 'Denominación', key: 'denominacion' },
    { label: 'Producto/ Insumo', key: 'esInsumo', render: (insumoT: boolean) => (insumoT ? 'Insumo' : 'Producto') },
    { label: 'Imagen', key: 'imagen' },
    { label: 'Descripcion', key: 'descripcion' },
    { label: 'Precio Compra', key: 'precioCompra' },
    { label: 'Precio Venta', key: 'precioVenta' },
    { label: 'Stock Actual', key: 'stockActual' },
    { label: 'Stock Mínimo', key: 'stockMinimo' },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
    { label: 'Categoria', key: 'categoria', render: (categoria: Categoria) => categoria.denominacion },
    { label: 'Unidad de Medida', key: 'unidadMedida', render: (unidadMedida: UnidadMedida) => unidadMedida.tipo },
];
