
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import "./CardItem.css"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { IcartLocalStorage } from "../../Screens/Cart"

export const CardItem = ({ item }: any) => {

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
                <img onClick={handleViewProduct} className="card__image" src={item.url} alt={`${item.name}`} />
                    <div className="card__data">
                        <div className="card__info">
                            <h2>{item.name}</h2>
                            <p>${item.price}</p>
                        </div>
                    <button className="card__add" onClick={handleAddCart}>+</button>
                    </div>
                </article>
            </div>
    )
}
