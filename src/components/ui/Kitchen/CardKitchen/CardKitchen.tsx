import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { EEstadoPedido, IDetallePedido, IPedido } from '../../../../interfaces'
import KitchenItem from '../KitchenItem/KitchenItem'
import './CardKitchen.css'

interface CardKitchenProps {
    pedido: IPedido;
}

const CardKitchen = ({ pedido }: CardKitchenProps) => {

    const PENDIENTE = "#FF7700"; // naranja
    const PREPARADO = "#1DD75B"; // verde
    const PREPARACION = "#FFCC32"; //amarillo
    const RECHAZADO = "#F22128";
    const [colorState, setColorState] = useState<string | undefined>(undefined);
    const [btnState, setbtnState] = useState<string>()
    useEffect(() => {
        if (pedido.estadoPedido === "PENDIENTE") {
            setColorState(PENDIENTE);
            setbtnState('ACEPTAR')
        } else if (pedido.estadoPedido === "PREPARADO") {
            setColorState(PREPARADO);
            setbtnState('PREPARADO')
        } else if (pedido.estadoPedido === "PREPARACION") {
            setColorState(PREPARACION);
            setbtnState('FINALIZAR')
        } else if (pedido.estadoPedido === "RECHAZADO") {
            setColorState(RECHAZADO);
            setbtnState('CANCELADO')
        }
    }, []);
    return (
        <div className='cardKitchen_container-principal' >
            <div className='cardKitchen_header-container'>
                <div className='cardKitchen_header'>
                    <div className='cardKitchen_header-left'>
                        <p className='cardKitchen_label'>Orden</p>
                        <h4 className='cardKitchen_order' style={{ color: colorState }}>#{pedido.id}</h4>
                    </div>
                    <div className='cardKitchen_header-right'>
                        <p className='cardKitchen_clock' style={{ background: colorState }}>
                            <FontAwesomeIcon icon={faClock} />
                            23:40
                        </p>
                        <h4
                            className='cardKitchen_state'
                            style={{ background: colorState }}>
                            {pedido.estadoPedido === 'PENDIENTE' ? 'EN ESPERA' : pedido.estadoPedido}
                        </h4>
                    </div>
                </div>

            </div>
            <div className='cardKitchen_body-container'>
                {pedido.detallePedidos.map((detallePedido: IDetallePedido) => (
                    <KitchenItem
                        cantidad={detallePedido.cantidad}
                        denominacion={detallePedido.articuloManufacturado.denominacion} />
                ))}
            </div>
            <div className='cardKitchen_footer-container'>
                <div className="cardKitchen_footer">
                    <button
                        className="cardKitchen_state"
                        style={{
                            background: colorState,
                            pointerEvents: pedido.estadoPedido === 'RECHAZADO' || pedido.estadoPedido === 'PREPARADO' ? 'none' : 'auto',
                            opacity: pedido.estadoPedido === 'RECHAZADO' || pedido.estadoPedido === 'PREPARADO' ? 0.5 : 1,
                        }}
                        onClick={() => { console.log('ACA va el update del pedido') }}
                    >
                        {btnState}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardKitchen
