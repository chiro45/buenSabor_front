import { EEstadoPedido, EFormaPago, ETipoEnvio } from "../enums";
import { ICliente } from "./ICliente";
import { IDetallePedido } from "./IDetallePedido";
import { IDomicilio } from "./IDomicilio";

export interface IPedido {
  id: number;
  tipoClase: string;
  fecha: Date;
  numero: number;
  domicilio: IDomicilio;
  estadoPedido: EEstadoPedido;
  tipoEnvio: ETipoEnvio;
  formaPago: EFormaPago;
  cliente: ICliente;
  detallePedidos: IDetallePedido[];
}