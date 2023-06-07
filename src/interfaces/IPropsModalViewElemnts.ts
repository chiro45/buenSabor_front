import { IUnidadMedida, ICategoria, IArticuloManufacturado,  IArticuloInsumo } from "./entidades";

export interface IProps {
  object: IUnidadMedida | IArticuloInsumo | IArticuloManufacturado | ICategoria;
  [key: string]: any;
}
