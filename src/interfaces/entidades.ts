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

export interface DetalleArticuloManufacturado {
    id: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
    articuloManufacturado: ArticuloManufacturado;
}