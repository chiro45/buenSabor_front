import { Categoria, UnidadMedida, Producto} from "./";


export interface ArticuloInsumo {
    id: number;
    tipoClase: string;
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
