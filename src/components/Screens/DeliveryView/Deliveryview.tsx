import './DeliveryView.css'
import img from '../../../assets/logopng.webp'
import { useEffect, useState } from 'react';
import { Footer } from '../../ui/Footer/Footer';
import { ItemDelivery } from './ItemOrdersDelivery/ItemOrdersDelivery';
import { Header } from '../../ui';
import { useSocket } from '../../../hooks';
import { getElementSetState } from '../../../helpers';
import { useAuth0 } from '@auth0/auth0-react';
import { IPedido } from '../../../interfaces';
const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlPedidosByDelivery = `${import.meta.env.VITE_URL_PEDIDOS}/allByDelivery`

export const Deliveryview = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [statePedidos, setStatePedidos] = useState<IPedido[]>([])

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    const { getAccessTokenSilently, user } = useAuth0()

    const socketState = useSocket({
        connectionUrl: urlWs, subscriptionTopic: `/pedidows/public`
    })

    const fetchData = async (url: string, setPedido: Function) => {
        const idAuth0 = user?.sub?.split('|').pop();
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        getElementSetState(`${url}/${idAuth0}`, headers, setPedido);
    }

    useEffect(() => {
        fetchData(urlPedidosByDelivery, setStatePedidos)

    }, [socketState]);




    return (
        <div className='containerDeliveryView'>
            {/* <div className='headerDelivery'>
                <div className='nameHeader'><p>Federico</p></div>
                <div className='imgHeader'><img src={img} /></div>
                `   <div className='buttonAccountHeader'><button>Mi cuenta</button></div>
            </div> */}
            <Header />
            <div className='containerBodyDelivery'>

                <div className='containerPadding'>
                    <div className={`containerCheckDisponible ${isChecked ? 'disponible' : 'noDisponible'}`}>
                        <div>
                            <h3>{isChecked ? 'Disponible' : 'No Disponible'}</h3>
                        </div>
                        <div>
                            <label className="switch">
                                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                                <span className="slider round" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3>Pedidos</h3>
                    </div>
                    <div className='containerPedidos'>
                        <div className="containerHeaderPedidos">
                            <div><p>Nº</p></div>
                            <div><p>Entregado</p></div>
                            <div><p>Detalle</p></div>
                            <div><p>Direccion</p></div>
                        </div>
                        <div className='containerPedidosBody'>
                            {
                                statePedidos.map((el) => (
                                    <ItemDelivery element={el}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

