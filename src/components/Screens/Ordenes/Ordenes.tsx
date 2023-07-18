import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavBarMobile } from "../../ui"
import "./Ordenes.css"
import { faArrowLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { IPedido } from "../../../interfaces"
import { useSocket } from "../../../hooks/useSocket"
import { useAuth0 } from "@auth0/auth0-react"
import { useAccessToken } from "../../../hooks"
import { getElementSetState } from "../../../helpers"
const urlWs = `${import.meta.env.VITE_URL_WS}`;

const urlPedidosByID = `http://localhost:9000/pedidos/byCliente/18`
export const Ordenes = () => {
    const header = useAccessToken();

    const { user } = useAuth0()

    const [orders, setOrders] = useState<IPedido[]>([])
    const socketState = useSocket({
        connectionUrl: urlWs, subscriptionTopic: `/user/${user?.email}/private`
    })
    useEffect(() => {
        getElementSetState(`${urlPedidosByID}`, header, setOrders);
    }, [socketState])

    return (
        <>
            <div className="containerOrderPrincipal">
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '8vh'
                }}>
                    <button className="buttonVolverAStore" >
                        <FontAwesomeIcon icon={faArrowLeft} /> Volver a la tienda</button>
                </div>
                <div className="containerTitleOrders">
                    <p >Mis Ordenes</p>
                </div>
                <div className="containerordersO">

                    <div style={{ display: "flex", flexDirection: 'column', gap: '2vh' }}>
                        {
                            orders.map((el) => (
                                <div className="containerItemOrder">
                                    <div className="containerDescriptionOrders">
                                        <div style={{ width: '24%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <FontAwesomeIcon fontSize={'4vh'} icon={faBagShopping} />
                                        </div>
                                        <div style={{ width: '75%' }}>
                                            <p><b>Número de pedido: </b>{el.numero}</p>
                                            <p><b>Estado:</b> {el.estadoPedido}</p>
                                        </div>
                                    </div>
                                    <div className="containerButtonItemOrder">
                                        <button className="buttoncontainerButtonItemOrder">
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>
            <NavBarMobile />
        </>
    )
}
