
import { Link } from 'react-router-dom';

import { FC, useEffect, useState } from 'react';


export const CartResume: FC = ({ items }: any) => {
    const [amountProducts, setAmountProducts] = useState(0)
    
    const [cantProducts, setcantProducts] = useState(0)

    useEffect(() => {
        let cantidad = 0
        let precios = 0
        if (items.length > 0) {
            items.forEach((el: any) => {
                cantidad += el.cantidad;
                precios += el.itemStore.precioVenta * el.cantidad;
            })
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
