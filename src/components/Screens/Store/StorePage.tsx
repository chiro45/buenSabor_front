
import { Header, NavBarMobile } from "../../ui"
import './StorePage.css'
import { FiltrosStore } from "./FiltrosStore/FiltrosStore"
import { ProductStore } from "./ProductStore/ProductStore"
import { Footer } from "../../ui/Footer/Footer"
import { PaginationButtons } from "./PaginationButtons/PaginationButtons"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { startAddProductStore } from "../../../Redux/Reducers/StoreProductReducers/StoreProductReducer"
import { useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"

export const StorePage = () => {

    const dispatch = useDispatch()

    const { getAccessTokenSilently } = useAuth0();
    const { orderPriceActive, categoriaActiva, busqueda } = useSelector((state: any) => state.StoreProductReducer)
    const totalPages = useSelector((state: any) => state.StoreProductReducer.totalPages);
    const [page, setPage] = useState(0)
    const [changeFilter, setchangeFilter] = useState(false)
    const dispatchData = async (url: string) => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        dispatch(startAddProductStore(url, headers))
    }
    useEffect(() => {
        if (busqueda === '') {
            const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/pagedPrice/${page}/${orderPriceActive || 'default'}/${categoriaActiva || 'default'}`
            dispatchData(url)
        } else {
            const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/allByName/${page}/${orderPriceActive || 'default'}/${busqueda || 'default'}`
            dispatchData(url)
        }
    }, [page, changeFilter,])

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
            <PaginationButtons page={(page + 1)} totalPages={totalPages} setPage={setPage} />
            <Footer />
            <NavBarMobile />
        </div>
    )
}
