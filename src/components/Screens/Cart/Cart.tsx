import { useEffect } from 'react';
import { dataHardcodeada } from '../../../helpers';
import { useCounter } from '../../../hooks';
import { IArticuloManufacturado } from '../../../interfaces';
import { CartCard, CartHeader, CartResume } from '../../ui';
import './Cart.css'
import { useLocalStorage } from '../../../hooks/useLocalStorage';



interface IcartLocalStorage {
    itemStore: IArticuloManufacturado
    cantidad: number
}
export const Cart = () => {
    const [counters, counterActions] = useCounter();

    const handleDeleted = (productId: number) => {
        console.log("Te voy a borrar", productId)
    };


    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);

    useEffect(() => {
        // Actualizar el estado counters cuando se carga un nuevo producto
        dataHardcodeada.forEach((producto: IArticuloManufacturado) => {
            counterActions.addProduct(producto.id, 1);
            // Incrementar el contador para cada producto y establecerlo en 1
        });
    }, []);


    return (
        <div className="cart_principal-container">
            <CartHeader title="Tu pedido" subtitle="Ven Rapido y Sabroso" />
            <CartResume counters={counters} productos={dataHardcodeada} />
            <h1 className='cart_body-container_h1'>Estas llevando:</h1>
            <hr />
            <div className="cart_body-container">

                <>
                    {dataHardcodeada.map((producto: IArticuloManufacturado) => (
                        <CartCard
                            key={producto.id}
                            producto={producto}
                            increment={counterActions.increment}
                            decrement={counterActions.decrement}
                            counter={counters}
                            handleDeleted={handleDeleted}
                            productId={producto.id}
                        />
                    ))}
                </>
            </div>
            <div className="cart_btn-container">
                <button className="cart_btn-pagar">Ir a pagar</button>
            </div>
        </div>
    );
};
