
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./CardItem.css"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"

export const CardItem = ({ item }: any) => {

    const handleViewProduct = () => {
        console.log(item)
    }

    const handleaddToCart = () => {
        console.log(item.id)
    }

    return (
        <div onClick={handleViewProduct} className="containerPrincipal__cardItem">
            <div className="containerImg__cardItem">
                <div className="container__butoonAddCart__cardItem">
                    <button onClick={handleaddToCart} className="butoonAddCart__cardItem">
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>
                <img src={`${item.url}`} />
            </div>
            <div className="containerTitle__cardItem">
                <p><b>{item.name}</b></p>
            </div>
            <div className="containerPrice__cardItem">
                <b>Precio:</b> ${item.price}
            </div>

        </div>
    )
}
