import axios from "axios";
import { EEstadoPedido, IPedido } from "../../../interfaces"

const urlUpdateEstado = `${import.meta.env.VITE_URL_PEDIDOSUPDATESTATE}`;
const urlUpdateEstadoDelivery = `${import.meta.env.VITE_URL_PEDIDOSUPDATESTATEENTREGA}`;

export const handleUpdateState = async (estado: EEstadoPedido, pedido: IPedido, header: any) => {
    await axios.put(`${urlUpdateEstado}/${pedido.id}/${estado}`, header)

}
export const handleUpdateStateEnvio = async (estado: EEstadoPedido, pedido: IPedido, header: any, delivery: string) => {
    console.log(`${urlUpdateEstadoDelivery}/${pedido.id}/${estado}/${delivery}`, header)
    await axios.put(`${urlUpdateEstadoDelivery}/${pedido.id}/${estado}/${delivery}`, header)

}

export const sendToKitchen = (pedido: IPedido, header: any) => {
    handleUpdateState(EEstadoPedido.ESPERA, pedido, header)
    console.log('Enviar a cocina')
}
//TODO OTRO PUT
export const payOrder = (pedido: IPedido, header: any) => {
    console.log("pagar ordern")
}

export const cancelOrder = (pedido: IPedido, header: any) => {
    handleUpdateState(EEstadoPedido.RECHAZADO, pedido, header)
    console.log('Cancelar Order')
}

