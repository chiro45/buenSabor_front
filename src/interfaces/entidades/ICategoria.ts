
export interface ICategoria {
    id: number;
    tipoClase: string;
    altaBaja: boolean;
    denominacion: string;
    parent: ICategoria;
}
