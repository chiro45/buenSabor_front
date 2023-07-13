import { IArticuloManufacturado } from "../../../interfaces";

export interface IProductReducer{
    productStore: IArticuloManufacturado[] | []
    productActive: IArticuloManufacturado | null
    busqueda?:string
    categoriaActiva?:string
    orderPriceActive?:string
}
export interface IActionStoreProductsReducer {
    type: string;
    payload?: IApiResponse
}

export interface IApiResponse {
    content: IArticuloManufacturado[];
    totalPages?: number;
  }