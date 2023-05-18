
export interface Categoria {
    id: number;
    tipoClase: string;
    altaBaja: boolean;
    denominacion: string;
    parent: Categoria;
}
