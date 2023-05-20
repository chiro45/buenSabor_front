import { ICategoria, IUnidadMedida} from ".";


export interface IArticuloInsumo {
    id: number;
    tipoClase: string;
    denominacion: string;
    precioCompra: number;
    precioVenta: number;
    stockActual: number;
    stockMinimo: number;
    altaBaja: boolean;
    categoria: ICategoria;
    unidadMedida: IUnidadMedida;
}
