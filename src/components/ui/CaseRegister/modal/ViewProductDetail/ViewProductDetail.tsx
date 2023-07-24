
import { LayoutModalCaseRegister } from '../Layout/LayoutModalCaseRegister'

import { IPedido } from '../../../../../interfaces/entidades/IPedido';
import { ETipoEnvio } from '../../../../../interfaces';

import './ViewProductDetail.css'
export const ViewProductDetail = ({ pedido, width, height, handleClose }: { pedido: IPedido, width: string, height: string, handleClose: Function }) => {


    return (
        <LayoutModalCaseRegister width={width} height={height}>
            <div className="main-container">
                <div className="inner-container">
                    <h1>Informacion del pedido</h1>
                    <p><b>Número de pedido:</b> {pedido.numero}</p>
                    <p><b>Email:</b> {pedido.cliente.email}</p>
                    <p><b>Forma de Pago:</b> {pedido.formaPago}</p>
                    <p><b>Monto:</b>$ {pedido.monto}</p>
                    <p><b>Metodo de envio:</b> {pedido.tipoEnvio}</p>
                    {pedido.tipoEnvio === ETipoEnvio.DELIVERY && <p><b>Direccion:</b> {pedido.domicilio.calle}</p>}
                    <div className="list-products-container" id='divPrint'>
                        <h2>Lista de productos:</h2>
                        <div className="product-container">
                            <div className="product-grid">
                                <div className="grid-cell">
                                    <p><b>Cantidad</b></p>
                                </div>
                                <div className="grid-cell">
                                    <p><b>Denominacion</b></p>
                                </div>
                            </div>
                            <div className="product-list">
                                {pedido.detallePedidos.map((el) => (
                                    <div className="product-row">
                                        <div className="grid-cell">
                                            <p>{el.cantidad}</p>
                                        </div>
                                        <div className="grid-cell">
                                            <p>{el.articuloManufacturado.denominacion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button style={{ backgroundColor: 'var(--terciario)' }} onClick={() => { handleClose() }}>Cerrar</button>
                    </div>
                </div>
            </div>
        </LayoutModalCaseRegister >
    )
}


