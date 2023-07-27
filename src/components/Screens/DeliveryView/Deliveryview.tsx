import './DeliveryView.css'
import img from '../../../assets/logopng.webp'
import { useEffect, useState } from 'react';
import { Footer } from '../../ui/Footer/Footer';
import { ItemDelivery } from './ItemOrdersDelivery/ItemOrdersDelivery';
import { Header } from '../../ui';
import { useSocket } from '../../../hooks';
import { fetchGet, getElementSetState } from '../../../helpers';
import { useAuth0 } from '@auth0/auth0-react';
import { IPedido } from '../../../interfaces';
import { ViewProductDetail } from '../../ui/CaseRegister/modal/ViewProductDetail/ViewProductDetail';
import { LayoutModalCaseRegister } from '../../ui/CaseRegister/modal/Layout/LayoutModalCaseRegister';
const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlPedidosByDelivery = `${import.meta.env.VITE_URL_PEDIDOS}/allByDelivery`

export const Deliveryview = () => {

    const [statePedidos, setStatePedidos] = useState<IPedido[]>([])
    const [product, setProduct] = useState<IPedido | null>(null)


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
        const data = await fetchGet(`${url}/${idAuth0}`, headers)
        console.log(data)
        setPedido(data)
    }

    useEffect(() => {
        fetchData(urlPedidosByDelivery, setStatePedidos)
    }, [socketState, user]);

    return (
        <div className='containerDeliveryView'>

            <Header />
            <div className='containerBodyDelivery'>
                {
                    product &&
                    <LayoutModalCaseRegister>
                        <LayoutModalCaseRegister width={'90vw'}
                            height={'55vh'}>
                            <div className="main-container">
                                <div className="inner-container">
                                    <h1>Informacion del pedido</h1>
                                    <p><b>Número de pedido:</b> {product.id}</p>
                                    <p><b>Email:</b> {product.cliente.email}</p>
                                    <p><b>Direccion:</b> {product.domicilio.calle}</p>
                                    <p><b>Numero:</b> {product.domicilio.numero}</p>
                                    {
                                        product.domicilio.piso !== undefined && product.domicilio.piso !== null
                                            ? <p><b>Piso:</b>{product.domicilio.piso}</p>
                                            : null
                                    }

                                    <p><b>Localidad:</b>{product.domicilio.localidad}</p>
                                    <div className="list-products-container">
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
                                                {product.detallePedidos.map((el) => (
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
                                        <button style={{ backgroundColor: 'var(--terciario)' }} onClick={() => { setProduct(null) }}>Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </LayoutModalCaseRegister >


                    </LayoutModalCaseRegister>
                }
                <div className='containerPadding'>
                    <div className={`containerCheckDisponible disponible`}>
                        <div>
                            <h3>Pedidos a repartir</h3>
                        </div>

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
                                    <ItemDelivery element={el} setProduct={setProduct} />
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

