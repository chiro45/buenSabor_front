
import { IArticuloManufacturado } from '../../../interfaces';
import { CartCard, CartHeader, CartResume, } from '../../ui';
import './Cart.css'
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CustomWallet } from '../../ui/CustomWallet/CustomWallet';



interface IcartLocalStorage {
    itemStore: IArticuloManufacturado
    cantidad: number
}
export const Cart = () => {

    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);
    return (
        <div className="cart_principal-container">
            <CartHeader title="Tu pedido" subtitle="Ven Rapido y Sabroso" />
            <CartResume items={items}/> 
            <h1 className='cart_body-container_h1'>Estas llevando:</h1>
            <hr />
            <div className="cart_body-container">
                <>
                    {
                        items.length > 0 &&
                        items.map((producto: IcartLocalStorage) => (
                            <CartCard
                                key={producto.itemStore.id}
                                producto={producto.itemStore}
                                cantidad={producto.cantidad}
                                productId={producto.itemStore.id}
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
        </div>
    );
};
