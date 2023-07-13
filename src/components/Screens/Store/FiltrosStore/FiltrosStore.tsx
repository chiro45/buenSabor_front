import { faArrowRightArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './FiltroStore.css'
import { useEffect, useState } from "react"
import { useAccessToken } from "../../../../hooks"
import { useDispatch } from "react-redux"
import { addCategoryActive, addOrderPriceActive, startAddProductStore } from "../../../../Redux/Reducers/StoreProductReducers/StoreProductReducer"
export const FiltrosStore = () => {

    const [openOrder, setOpenOrder] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    const headers = useAccessToken();
    const dispatch = useDispatch()

    const [sortPrice, setSortPrice] = useState('menor')
    const [category, setCategory] = useState('default')

    const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}/pagedPrice/0/${sortPrice}/${category}`
    const handleFetchFilter = (param: string) => {
        setCategory(param);
        dispatch(addCategoryActive(param));
    }

    const handleFetchOrder = (param: string) => {
        setSortPrice(param)
        dispatch(addOrderPriceActive(param))
    };

    useEffect(() => {
        setOpenOrder(false)
    }, [sortPrice, category])

    const arrOrder = [
        {
            param: "mayor",
            text: "Mayor Precio"
        },
        {
            param: "menor",
            text: "Menor Precio"
        }
    ]

    const arrFilter = [
        {
            param: "Hamburguesas",
            text: "Hamburguesas"
        },
        {
            param: "pizzas",
            text: "Pizzas"
        },
        {
            param: "papas",
            text: "Papas"
        },
        {
            param: "bebidas",
            text: "Bebidas"
        }
    ]

    return (
        <div className="containerPrincipal__FiltroStore">
            <div className="containerActions__FiltroStore" onClick={() => {
                setOpenOrder(!openOrder)
                setOpenFilter(false)

            }}>
                <button className="">
                    <FontAwesomeIcon style={{ rotate: "90deg", marginLeft: "-.3rem" }} icon={faArrowRightArrowLeft} /><p>Ordenar</p>
                </button>
                {
                    openOrder &&
                    <div className="containerOrder " style={{ height: '10vh' }}>
                        {arrOrder.map(el => (
                            <div
                                className="containerOrderItem"
                                onClick={() => { handleFetchOrder(el.param) }}
                            ><p>{el.text}</p></div>
                        ))}
                    </div>
                }

            </div>
            <div style={{ borderLeft: "1px solid #ccc" }}
                className="containerActions__FiltroStore"
                onClick={() => {
                    setOpenFilter(!openFilter)
                    setOpenOrder(false)
                }}>
                <button >
                    <FontAwesomeIcon icon={faBars} /><p>Filtrar</p>
                </button>

                {
                    openFilter &&
                    <div className="containerOrder " style={{ height: '19vh' }}>
                        {
                            arrFilter.map(el => (
                                <div
                                    onClick={() => { handleFetchFilter(el.param) }}
                                    className="containerOrderItem">
                                    <p>{el.text}</p>
                                </div>

                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}
