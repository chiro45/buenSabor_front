
import "./CardItem.css"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { IcartLocalStorage } from "../../Screens/Cart"
import { IArticuloManufacturado } from "../../../interfaces"

export const CardItem = ({ item }: { item: IArticuloManufacturado }) => {

    const navigate = useNavigate()
    const handleViewProduct = () => {
        navigate('/viewProduct')
    }

    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);

    const handleAddCart = () => {

        const existingItemIndex = items.findIndex(
            (el) => el.articuloManufacturado.denominacion === item.denominacion
        );
        const updatedItems = [...items];

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].cantidad = 1;
            updatedItems.splice(existingItemIndex, 1);

        } else {
            updatedItems.push({
                articuloManufacturado: item,
                subtotal: (item.precioVenta),
                cantidad: updatedItems[existingItemIndex].cantidad = updatedItems[existingItemIndex].cantidad + 1
            });
        }
        setItem(updatedItems);
    };

    return (
        <div className="containerCardItem">
            <article className="card">
                <img onClick={handleViewProduct} className="card__image" src={item.imagen} alt={`${item.denominacion}`} />
                <div className="card__data">
                    <div className="card__info">
                        <h2>{item.denominacion}</h2>
                        <p>${item.precioVenta}</p>
                    </div>
                    <button className="card__add" onClick={handleAddCart}>+</button>
                </div>
            </article>
        </div>
    )
}
