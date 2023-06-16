import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Counters } from '../../../hooks';
import { IArticuloManufacturado } from '../../../interfaces';

interface CartSummaryProps {
    counters: Counters;
    productos: IArticuloManufacturado[];
}

export const CartResume: React.FC<CartSummaryProps> = ({ counters, productos }) => {
    const totalProductos = Object.values(counters).reduce((sum, count) => sum + count, 0);
    const precioTotal = productos.reduce((sum, producto) => {
        const counter = counters[producto.id] || 0;
        return sum + counter * producto.precioVenta;
    }, 0);

    return (
        <div className="cart_resume-container">
            <div className="cart_resume-info">
                <h3>{totalProductos} productos</h3>
                <p>${precioTotal.toFixed(2)} Estimado</p>

            </div>
            <Link className="cart_resume-link" to={'/'}>
                Añadir mas
            </Link>
        </div>
    )
}
