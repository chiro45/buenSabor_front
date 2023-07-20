
import { LayoutModalCaseRegister } from '../Layout/LayoutModalCaseRegister'

import { IPedido } from '../../../../../interfaces/entidades/IPedido';
import { ETipoEnvio } from '../../../../../interfaces';


export const ViewProductDetail = ({ pedido, width, height, handleClose }: { pedido: IPedido, width: string, height: string, handleClose: Function }) => {
    

    return (
        <LayoutModalCaseRegister width={width} height={height}>
            <div style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: 'column',
                height: '100%',
                width: '100%'
            }}>
                <div>
                    <h1>Informacion del pedido</h1>
                    <p>Número de pedido: {pedido.numero}</p>
                    <p>Email: {pedido.cliente.email}</p>
                    <p>Forma de Pago: {pedido.formaPago}</p>
                    <p>Monto:$ {pedido.monto}</p>
                    <p>Metodo de envio: {pedido.tipoEnvio}</p>
                    {
                        pedido.tipoEnvio === ETipoEnvio.DELIVERY &&
                        <p>Direccion: {pedido.domicilio.calle}</p>
                    }
                    <div id='divPrint'>
                        <h2>Lista de producto:</h2>
                        <div style={{ padding: '.5vh', boxShadow: '0px 4px 10px rgba(0,0,0,.2)' }} >
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
                                border: '1px solid #cdd',
                            }}>
                                <div style={{
                                    height: "4vh",
                                    display: "flex",
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <p><b>Cantidad</b></p>
                                </div>
                                <div style={{
                                    height: "4vh",
                                    display: "flex",
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <p><b>Denominacion</b></p>
                                </div>
                            </div>
                            <div style={{ border: '1px solid #cdd', borderTop: 'none', minHeight: '15vh', maxHeight: '25vh', overflowY: 'auto', borderBottom: '1px solid #cdd', }}>
                                {

                                    pedido.detallePedidos.map((el) => (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(2,1fr)',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            justifyItems: 'center',
                                            borderBottom: '1px solid #cdd'
                                        }}>
                                            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '4vh' }}>
                                                <p>{el.cantidad}</p>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '4vh' }}>
                                                <p>{el.articuloManufacturado.denominacion}</p>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh', width: '100%', marginBottom: '1vh' }}>
                        <button style={{ backgroundColor: 'var(--terciario)' }} onClick={() => { handleClose() }}>Cerrar </button>
                    </div>
                </div>
            </div>
        </LayoutModalCaseRegister >
    )
}


