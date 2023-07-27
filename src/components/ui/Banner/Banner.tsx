import { Navigate, useNavigate } from "react-router-dom";
import "./Banner.css"
import { IArticuloManufacturado } from "../../../interfaces";
export const Banner = ({ bannerItem }: { bannerItem: IArticuloManufacturado }) => {

    
    const navigate = useNavigate();
    const handleaddToCart = () => {
        navigate('/cart')
    }
    const handleViewProduct = () => {
        
    }
    return (
        <div onClick={handleViewProduct} className="containerPrincipal-Banner">
            <div className="containerBanner-Info">
                <h1>{bannerItem.denominacion}</h1>
                <button  onClick={handleaddToCart} className="btnComprar-Banner">Comprar</button>
            </div>
            <img className="containerBanner-img" src={`${bannerItem.imagen}`} />
        </div>
    )
}
