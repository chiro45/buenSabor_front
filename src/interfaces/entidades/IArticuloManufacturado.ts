import { ICategoria } from "./ICategoria";
import { IDetalleArticuloManufacturado } from "./IDetalleArticuloManufacturado";

export interface IArticuloManufacturado {
    id: number;
    denominacion: string;
    tipoClase: string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    imagen: string;
    descripcion: string;
    receta: string;
    altaBaja: boolean;
    productoFinal: boolean;
    categoria: ICategoria;
    detalleArticuloManufacturados:IDetalleArticuloManufacturado[]
}
