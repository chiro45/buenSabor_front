
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import "./CardItem.css"
import { useNavigate } from "react-router-dom"

export const CardItem = ({ item }: any) => {

    const navigate = useNavigate()
    const handleViewProduct = () => {
        navigate('/viewProduct')
        console.log(item)
    }

    const handleaddToCart = () => {
        console.log(item.id)
    }

    return (
        <div  className="containerPrincipal__cardItem">
            <div className="containerImg__cardItem">
                <div className="container__butoonAddCart__cardItem">
                    <button onClick={handleaddToCart} className="butoonAddCart__cardItem">
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>
                <img onClick={handleViewProduct} src={`${item.url}`} />
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
