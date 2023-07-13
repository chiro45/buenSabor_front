
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

    const {orderPriceActive, categoriaActiva, busqueda} = useSelector((state: any) => state.StoreProductReducer)
    const totalPages = useSelector((state: any) => state.StoreProductReducer.totalPages);
    const [page, setPage] = useState(0)
    const [changeFilter, setchangeFilter] = useState(false)
    useEffect(() => {
        if (busqueda === '') {
            const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/pagedPrice/${page}/${orderPriceActive || 'default'}/${categoriaActiva || 'default'}`
            dispatch(startAddProductStore(url, headers))
        } else {
            const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/allByName/${page}/${orderPriceActive || 'default'}/${busqueda || 'default'}`
            dispatch(startAddProductStore(url, headers))
        }
    }, [page,changeFilter,])

    useEffect(() => {
        setPage(0)
        setchangeFilter(!changeFilter)
    }, [orderPriceActive, categoriaActiva])
    

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
