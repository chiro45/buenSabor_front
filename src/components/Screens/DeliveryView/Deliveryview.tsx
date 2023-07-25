import './DeliveryView.css'
import img from '../../../assets/logopng.webp'
import { useState } from 'react';
import { Footer } from '../../ui/Footer/Footer';
import { ItemDelivery } from './ItemOrdersDelivery/ItemOrdersDelivery';
import { Header } from '../../ui';
export const Deliveryview = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };


    return (
        <div className='containerDeliveryView'>
            {/* <div className='headerDelivery'>
                <div className='nameHeader'><p>Federico</p></div>
                <div className='imgHeader'><img src={img} /></div>
                `   <div className='buttonAccountHeader'><button>Mi cuenta</button></div>
            </div> */}
            <Header/>
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
                                [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(() => (
                                    <ItemDelivery />
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

