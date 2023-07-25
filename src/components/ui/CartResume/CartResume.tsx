
import { Link } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';
import { IcartLocalStorage } from '../../Screens/Cart';
import { IPedido } from '../../../interfaces';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

interface CartResumeProps {
    items: IcartLocalStorage[] | [];
}

export const CartResume: FC<CartResumeProps> = ({ items }) => {
    const [amountProducts, setAmountProducts] = useState(0)
    const [itemsPedido, setItemsPedido] = useLocalStorage<IPedido | {}>('cartPedido', {});
    const [cantProducts, setcantProducts] = useState(0)

    useEffect(() => {
        let cantidad = 0
        let precios = 0
        if (items.length >= 0) {
            items.forEach((el: any) => {
                cantidad += el.cantidad;
                precios += el.articuloManufacturado.precioVenta * el.cantidad;
            })
            setItemsPedido({...itemsPedido, monto: precios})
            setAmountProducts(precios)
            setcantProducts(cantidad)
        }
    }, [items])

    return (
        <div className="cart_resume-container">
            <div className="cart_resume-info">
                <h3>{cantProducts} productos</h3>
                <p>${amountProducts.toFixed(2)} Estimado</p>
            </div>
            <Link className="cart_resume-link" to={'/'}>
                Añadir mas
            </Link>
        </div>
    )
}
