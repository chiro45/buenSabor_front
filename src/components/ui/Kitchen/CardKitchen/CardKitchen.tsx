import { useAuth0 } from '@auth0/auth0-react'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { alertConfirm } from '../../../../functions/alerts'
import { EEstadoPedido, IDetallePedido, IPedido } from '../../../../interfaces'
import KitchenItem from '../KitchenItem/KitchenItem'
import './CardKitchen.css'

interface CardKitchenProps {
    pedido: IPedido;
}
const urlUpdateEstado = `${import.meta.env.VITE_URL_PEDIDOSUPDATESTATE}`;
const CardKitchen = ({ pedido }: CardKitchenProps) => {

    const {getAccessTokenSilently} = useAuth0();

    const ESPERA = "#FF7700"; // naranja
    const PREPARADO = "#1DD75B"; // verde
    const PREPARACION = "#FFCC32"; //amarillo
    const RECHAZADO = "#F22128"; //rojo
    const [colorState, setColorState] = useState<string | undefined>(undefined);
    const [btnState, setbtnState] = useState<string>()
    useEffect(() => {
        if (pedido.estadoPedido === EEstadoPedido.ESPERA) {
            setColorState(ESPERA);
            setbtnState('ACEPTAR')
        } else if (pedido.estadoPedido === EEstadoPedido.PREPARADO) {
            setColorState(PREPARADO);
            setbtnState('PREPARADO')
        } else if (pedido.estadoPedido === EEstadoPedido.PREPARACION) {
            setColorState(PREPARACION);
            setbtnState('FINALIZAR')
        } else if (pedido.estadoPedido === EEstadoPedido.RECHAZADO) {
            setColorState(RECHAZADO);
            setbtnState('CANCELADO')
        }
    }, []);

    const handleUpdateState = async () => {
        const token = await getAccessTokenSilently();
        const header = {
          'Authorization': `Bearer ${token}`
        };
        if (pedido.estadoPedido === EEstadoPedido.ESPERA) {
            await axios.put(`${urlUpdateEstado}/${pedido.id}/${EEstadoPedido.PREPARACION}`, header)
        } else if (pedido.estadoPedido === EEstadoPedido.PREPARACION) {
            await axios.put(`${urlUpdateEstado}/${pedido.id}/${EEstadoPedido.PREPARADO}`, header)
        }
    }
    const handleCancelState = async () => {
        const token = await getAccessTokenSilently();
        const header = {
          'Authorization': `Bearer ${token}`
        };
        await axios.put(`${urlUpdateEstado}/${pedido.id}/${EEstadoPedido.RECHAZADO}`, header)
    }
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
                            <>
                                <FontAwesomeIcon icon={faClock} />  {pedido.fecha}
                            </>
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
                    {(pedido.estadoPedido === EEstadoPedido.ESPERA || pedido.estadoPedido === EEstadoPedido.PREPARACION)  &&
                        <button
                            className="cardKitchen_state"
                            style={{
                                background: '#F22128'
                            }}
                            onClick={() => alertConfirm('CANCELAR PEDIDO?', 'Cancelacion pedido', 'SI', handleCancelState, "No")}
                        >
                            RECHAZAR
                        </button>
                    }
                    <button
                        className="cardKitchen_state"
                        style={{
                            background: colorState,
                            pointerEvents: pedido.estadoPedido === 'RECHAZADO' || pedido.estadoPedido === 'PREPARADO' ? 'none' : 'auto',
                            opacity: pedido.estadoPedido === 'RECHAZADO' || pedido.estadoPedido === 'PREPARADO' ? 0.5 : 1,
                        }}
                        onClick={() => handleUpdateState()}
                    >
                        {btnState}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardKitchen
