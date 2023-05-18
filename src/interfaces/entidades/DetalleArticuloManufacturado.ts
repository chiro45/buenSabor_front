import { ArticuloInsumo, ArticuloManufacturado} from "./";


export interface DetalleArticuloManufacturado {
    id: number;
    tipoClase: string;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
    articuloManufacturado: ArticuloManufacturado;
}
