import { IPedido } from "../../../interfaces"

import img from '../../../assets/logo.webp'

export const ViewFacture = ({ pedido, indice }: { pedido: IPedido, indice: number }) => {


return (
    <div id={`divPrint${indice}`} style={{
            fontFamily: 'Arial, sans-serif',
            width: '15cm', // Tamaño hoja A4 en horizontal
            minHeight: '1cm', // Tamaño hoja A4 en vertical
            padding: '1cm',
            margin: 'auto',
            boxSizing: 'border-box',
            position: 'relative',
        }}>
        <h2 style={{ textAlign: 'center' }}>Ven Rapido Y Sabroso</h2>
        <h2 style={{ textAlign: 'center' }}>Factura Tipo A</h2>
        <div style={{ width: '80%', padding: '1cm', margin: "0vh 2vh", display: "flex", justifyContent: "center", alignItems: 'center' }}>
            <img src={img} style={{ borderRadius: '.4rem' }} height={'100px'} />
        </div>

        <div style={{ marginBottom: '2vh' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid #cdd',
                background: '#f0f0f0',
            }}>
                <div style={{
                    height: "4vh",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <p><b>Cantidad</b></p>
                </div>
                <div style={{
                    height: "4vh",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <p><b>Denominacion</b></p>
                </div>
                <div style={{
                    height: "4vh",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <p><b>Precio</b></p>
                </div>
            </div>
            <div style={{
                border: '1px solid #cdd',
                borderTop: 'none',

                borderBottom: '1px solid #cdd',
            }}>
                {pedido.detallePedidos.map((el) => (
                    <div key={el.id} style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        borderBottom: '1px solid #cdd',
                    }}>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '4vh' }}>
                            <p>{el.cantidad}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '4vh' }}>
                            <p>{el.articuloManufacturado.denominacion}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '4vh' }}>
                            <p>${el.articuloManufacturado.precioVenta}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '2vh' }}>
            <div>
                <p><b>CUIT/CUIL: 20-43354623-8</b></p>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p><b>Total:${pedido.monto}</b></p>
            </div>
        </div>

        <p style={{ textAlign: 'center', marginBottom: '2vh' }}>Gracias por su compra</p>
    </div >


)
}
