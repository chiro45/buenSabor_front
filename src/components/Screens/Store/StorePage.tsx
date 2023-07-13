
import { Header, NavBarMobile } from "../../ui"
import './StorePage.css'
import { FiltrosStore } from "./FiltrosStore/FiltrosStore"
import { ProductStore } from "./ProductStore/ProductStore"
import { Footer } from "../../ui/Footer/Footer"
import { PaginationButtons } from "./PaginationButtons/PaginationButtons"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer"
import { useAccessToken } from "../../../hooks"
import { useSelector } from "react-redux"

export const StorePage = () => {

    const dispatch = useDispatch()

    const headers = useAccessToken();

    const search = useSelector((state: any) => state.StoreProductReducer)
    const totalPages = useSelector((state: any) => state.StoreProductReducer.totalPages);
    
    const [page, setPage] = useState(0)
    useEffect(() => {
        if (search.busqueda === '' && search.categoriaActiva === '') {
            const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/paged/${page}`
            dispatch(startAddProductStore(url, headers))
        }
       
    }, [page,])


    return (
        <div className="containerPrincipal__storePage">
            <Header />
            <FiltrosStore />
            <div style={{
                height: "1vh",
                width: '100%',
                backgroundColor: "var(--terciario)"
            }}></div>
            <ProductStore />
            <div style={{
                height: "1vh",
                width: '100%',
                backgroundColor: "var(--terciario)"
            }}></div>
            <PaginationButtons page={(page+1)} totalPages={totalPages} setPage={setPage} />
            <Footer />
            <NavBarMobile />
        </div>
    )
}
