import { IArticuloManufacturado, IPedido } from ".";

export interface IDetallePedido {
    id:number;
    tipoClase: string;
    cantidad: number;
    subtotal: number;
    pedido: IPedido;
    articuloManufacturado: IArticuloManufacturado;
  }
  