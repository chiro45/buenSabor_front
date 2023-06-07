import { IArticuloInsumo, IArticuloManufacturado} from ".";


export interface IDetalleArticuloManufacturado {
    id: number;
    tipoClase: string;
    cantidad: number;
    articuloInsumo: IArticuloInsumo;
    articuloManufacturado: IArticuloManufacturado;
}
