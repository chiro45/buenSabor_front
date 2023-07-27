import { Navigate, useNavigate } from "react-router-dom";
import "./Banner.css"
import { IArticuloManufacturado } from "../../../interfaces";
import { startAddProductActive } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
export const Banner = ({ bannerItem }: { bannerItem: IArticuloManufacturado }) => {


    const navigate = useNavigate();

    const { getAccessTokenSilently } = useAuth0()

    const dispatch = useDispatch()
    const handleViewProduct = async () => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`
        dispatch(startAddProductActive(url, bannerItem.id, headers))
        navigate('/ViewProduct')
    }
    return (
        <div onClick={handleViewProduct} className="containerPrincipal-Banner">
            <div className="containerBanner-Info">
                <h1>{bannerItem.denominacion}</h1>
                <button onClick={handleViewProduct} className="btnComprar-Banner">Ir al producto</button>
            </div>
            <img className="containerBanner-img" src={`${bannerItem.imagen}`} />
        </div>
    )
}
