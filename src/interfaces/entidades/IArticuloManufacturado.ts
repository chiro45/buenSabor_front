import { ICategoria } from "./ICategoria";
import { IDetalleArticuloManufacturado } from "./IDetalleArticuloManufacturado";

export interface IArticuloManufacturado {
    id: number;
    denominacion: string;
    tipoClase: string;
    tiempoEstimadoCocina: number;
    precioCompra: number | undefined;
    precioVenta: number;
    imagen: string;
    descripcion: string;
    receta: string;
    altaBaja: boolean;
    productoFinal: boolean;
    stockActual: number | undefined;
    stockMinimo: number | undefined;
    categoria: ICategoria;
    detalleArticuloManufacturados:IDetalleArticuloManufacturado[]
}
