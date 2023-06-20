import { IArticuloManufacturado } from "../../../interfaces";

export interface IProductReducer{
    productStore: IArticuloManufacturado[] | []
    productActive: IArticuloManufacturado | null
    busqueda?:string
}
export interface IActionStoreProductsReducer {
    type: string;
    payload?: IArticuloManufacturado[] | [] | IArticuloManufacturado 
}