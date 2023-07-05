import { faArrowRightArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './FiltroStore.css'
import { useState } from "react"
export const FiltrosStore = () => {

    const [openOrder, setOpenOrder] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    const handleFetchFilter = (param: string) => {

    }

    const handleFetchOrder = (param: string) => {

    }

    const arrOrder = [{ param: "menorPrecio", text: "Mayor Precio" }, { param: "mayorPrecio", text: "Menor Precio" }]
    const arrFilter = [{ param: "hamburguesas", text: "Hamburguesas" }, { param: "pizzas", text: "Pizzas" }, { param: "papas", text: "Papas" }]
    return (
        <div className="containerPrincipal__FiltroStore">
            <div className="containerActions__FiltroStore">
                <button onClick={() => {
                    setOpenOrder(!openOrder)
                    setOpenFilter(false)

                }} className="">
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
            <div style={{ borderLeft: "1px solid #ccc" }} className="containerActions__FiltroStore">
                <button onClick={() => {
                    setOpenFilter(!openFilter)
                    setOpenOrder(false)

                }}>
                    <FontAwesomeIcon icon={faBars} /><p>Filtrar</p>
                </button>

                {
                    openFilter &&
                    <div className="containerOrder " style={{ height: '15vh' }}>
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
