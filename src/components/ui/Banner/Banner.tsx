import { Navigate, useNavigate } from "react-router-dom";
import "./Banner.css"
export const Banner = ({bannerItem}:any) => {

    const {id, name, url}=bannerItem;
    const navigate = useNavigate();
    const handleaddToCart = () => {
        navigate('/cart')
    }
    const handleViewProduct = () => {
        console.log(bannerItem)
    }
    return (
        <div onClick={handleViewProduct} className="containerPrincipal-Banner">
            <div className="containerBanner-Info">
                <h1>{name}</h1>
                <button  onClick={handleaddToCart} className="btnComprar-Banner">Comprar</button>
            </div>
            <img className="containerBanner-img" src={`${url}`} />
        </div>
    )
}
