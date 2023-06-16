import { IUnidadMedida, ICategoria, IArticuloManufacturado,  IArticuloInsumo } from "../../../../interfaces/entidades";

export interface IProps {
  object: IUnidadMedida | IArticuloInsumo | IArticuloManufacturado | ICategoria;
  [key: string]: any;
}
