import { UnidadMedida, Categoria, ArticuloManufacturado, Producto, ArticuloInsumo } from "./entidades";

export interface Props {
  object: UnidadMedida | ArticuloInsumo | Producto | ArticuloManufacturado | Categoria;
  [key: string]: any;
}
