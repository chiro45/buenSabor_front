
import { Header, NavBarMobile } from "../../ui"

import './StorePage.css'
import { FiltrosStore } from "./FiltrosStore/FiltrosStore"
import { ProductStore } from "./ProductStore/ProductStore"
import { Footer } from "../../ui/Footer/Footer"
import { PaginationButtons } from "./PaginationButtons/PaginationButtons"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer"
import { useAccessToken } from "../../../hooks"

export const StorePage = () => {
    
    const dispatch = useDispatch()
    
    const headers = useAccessToken();
    
    useEffect(()=>{
        const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`
        dispatch(startAddProductStore(url, headers))
    },[])


    return (
        <div className="containerPrincipal__storePage">
            <Header/>
            <FiltrosStore />
            <div style={{ height: "1vh", width: '100%', backgroundColor: "var(--terciario)" }}></div>
            <ProductStore />
            <div style={{ height: "1vh", width: '100%', backgroundColor: "var(--terciario)" }}></div>
            <PaginationButtons page={1} totalPages={9} />
            <Footer />
            <NavBarMobile />
        </div>
    )
}
