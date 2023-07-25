
import { EFormaPago, ETipoEnvio, IArticuloManufacturado, IPedido } from '../../../interfaces';
import { CartCard, CartHeader, CartResume, } from '../../ui';
import './Cart.css'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { faCreditCard, faMoneyBill1, faMotorcycle, faPersonWalking } from '@fortawesome/free-solid-svg-icons';
import CartOpciones from './CartOpciones/CartOpciones';
import { CustomWallet } from '../../ui/CustomWallet/CustomWallet';


export interface IcartLocalStorage {
    articuloManufacturado: IArticuloManufacturado
    subtotal: number
    cantidad: number
}

export const Cart = () => {

    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);

    return (
        <div className="cart_principal-container">
            <CartHeader title="Tu pedido" subtitle="Ven Rapido y Sabroso" />
            <CartResume items={items} />
            <CartOpciones
                opciones={[ETipoEnvio.DELIVERY, ETipoEnvio.LOCAL]}
                iconos={[faMotorcycle, faPersonWalking]}
                propiedad='tipoEnvio' />

            <CartOpciones
                opciones={[EFormaPago.EFECTIVO, EFormaPago.MPAGO]}
                iconos={[faMoneyBill1, faCreditCard]}
                propiedad='formaPago' />

            <h1 className='cart_body-container_h1'>Estas llevando:</h1>
            <hr />
            <div className="cart_body-container">
                <>
                    {
                        items.length > 0 &&
                        items.map((producto: any) => (

                            <CartCard
                                key={producto.articuloManufacturado.id}
                                producto={producto.articuloManufacturado}
                                cantidad={producto.cantidad}
                                productId={producto.articuloManufacturado.id}
                                items={items}
                                setItem={setItem}

                            />

                        ))

                    }
                </>
            </div>
            <div className="cart_btn-container">
                <CustomWallet/>
            </div>
            {/* <div className="cart_btn-container">
                <button onClick={() => handlePostPedido()}>Ir a Pagar</button>
            </div> */}
        </div>
    );
};
