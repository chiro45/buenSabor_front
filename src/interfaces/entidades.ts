export interface UnidadMedida {
    id: number;
    denominacion: string;
    tipo: string;
    altaBaja: boolean;
}

export interface ArticuloInsumo {
    id: number;
    denominacion: string;
    descripcion: string;
    esInsumo: boolean;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    imagen: string;
    altaBaja: boolean;
    categoria: Categoria;
    unidadMedida: UnidadMedida;
    producto: Producto;
}

export interface Producto {
    id: number;
    producto: string;
    altaBaja: boolean;
    imagen: string;
    descripcion: string;
    precioVenta: number;
}

export interface ArticuloManufacturado {
    id: number;
    tiempoEstimadoCocina: number;
    denominacion: string;
    precioVenta: number;
    imagen: string;
    descripcion: string;
    receta: string;
    altaBaja: boolean;
}

export interface Categoria {
    id: number;
    altaBaja: boolean;
    denominacion: string;
    parent: Categoria;
}
//No se usa
export interface Parent {
    id: number;
    altaBaja: boolean;
    denominacion?: string;
    parent?: {};
}
export interface DetalleArticuloManufacturado {
    id: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
    articuloManufacturado: ArticuloManufacturado;
}
export const ColumnsUnidadMedida = [
    { label: 'Denominacion', key: 'denominacion' },
    { label: 'Tipo', key: 'tipo' },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) =>
            altaBajaT === true ? 'Alta' : 'Baja',
    },
];
export const ColumnsInsumo = [
    { label: 'Denominación', key: 'denominacion' },
    { label: 'Producto/ Insumo', key: 'esInsumo', render: (insumoT: boolean) => (insumoT ? 'Insumo' : 'Producto') },
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

export const ColumnsCategoria = [
    { label: 'Denominacion', key: 'denominacion' },
    { label: "Categoria Padre", key: "parent", render: (parent: Categoria) => parent !== null ? parent.denominacion : "Padre" },
    {
        label: 'Alta/Baja',
        key: 'altaBaja',
        render: (altaBajaT: boolean) => (altaBajaT ? 'Alta' : 'Baja'),
    },
];
