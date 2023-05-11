export interface UnidadMedida {
    id: number;
    tipo: string;
}

export interface ArticuloInsumo {
    id: number;
    denominacion: string;
    esInsumo: boolean;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    categoria: Categoria;
    unidadMedida: UnidadMedida;
    producto: Producto; 
}

export interface Producto {
    id: number;
    producto: string;
    precioVenta: number;
   
}
export interface ArticuloManufacturado {
    id:number;
    tiempoEstimadoCocina: number;
    denominacion: string;
    precioVenta: number;
    imagen: string;
}
export interface Categoria {
    id: number;
    denominacion: string;
    parent:Categoria;
}

export interface DetalleArticuloManufacturado {
    id: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
    articuloManufacturado: ArticuloManufacturado;
}