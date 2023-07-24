import axios from "axios";
import { EEstadoPedido, IPedido } from "../../../interfaces"

const urlUpdateEstado = `${import.meta.env.VITE_URL_PEDIDOSUPDATESTATE}`;

export const handleUpdateState = async (estado: EEstadoPedido, pedido: IPedido, header: any) => {
    await axios.put(`${urlUpdateEstado}/${pedido.id}/${estado}`, header)

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

