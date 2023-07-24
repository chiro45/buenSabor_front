import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavBarMobile } from "../../ui"
import { faArrowLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { IPedido } from "../../../interfaces"
import { useSocket } from "../../../hooks/useSocket"
import { useAuth0 } from "@auth0/auth0-react"
import { getElementSetState } from "../../../helpers"
import useCliente from "../../../hooks/useCliente"
import "./Ordenes.css"
import { ViewProductDetail } from "../../ui/CaseRegister/modal/ViewProductDetail/ViewProductDetail"
import jsPDF from "jspdf"
import { ViewFacture } from "../../ui/ViewFacture/ViewFacture"
const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlPedidosByID = `${import.meta.env.VITE_URL_PEDIDOSBYCLIENTE}/`

export const Ordenes = () => {
    const { user, getAccessTokenSilently } = useAuth0()
    const cliente = useCliente();
    const [orders, setOrders] = useState<IPedido[]>([])
    const socketState = useSocket({
        connectionUrl: urlWs,
        subscriptionTopic: `/user/${user?.email}/private`,
    })
    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            if (cliente) {
                await getElementSetState(`${urlPedidosByID}${cliente.id}`, headers, setOrders);
            }
        };
        fetchData();
    }, [socketState, cliente]);

    const [product, setProduct] = useState<IPedido | null>(null)

    const printRef = useRef<HTMLElement | null>(null);

    const handleDownloadPDF = () => {
        printRef.current = document.getElementById('divPrint')
        if (printRef.current) {
            const pdf = new jsPDF('p', 'pt', 'letter');
            const printContents = printRef.current;

            pdf.html(printContents, {
                callback: () => {
                    pdf.save('informacion_pedido.pdf');
                }
            });
        }

    };

    return (
        <>
            {
                product &&
                <ViewProductDetail
                    handleClose={() => { setProduct(null) }}
                    pedido={product}
                    width={'90vw'}
                    height={'70vh'}
                />
            }
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
                                    <div style={{ display: 'none' }}>
                                        <ViewFacture pedido={el} />
                                    </div>
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
                                        <button onClick={() => { setProduct(el) }} className="buttoncontainerButtonItemOrder">
                                            Ver
                                        </button>
                                    </div>

                                    <div className="containerButtonItemOrder ">
                                        <button onClick={() => {
                                            if (el.pagoConfirmado) {
                                                handleDownloadPDF()
                                            }
                                        }} className={`buttoncontainerButtonItemOrder ${el.pagoConfirmado ? '' : 'disabled'}`}>
                                            DescargarFactura
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


/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavBarMobile } from "../../ui"
import { faArrowLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { IPedido } from "../../../interfaces"
import { useSocket } from "../../../hooks/useSocket"
import { useAuth0 } from "@auth0/auth0-react"
import { useAccessToken } from "../../../hooks"
import { getElementSetState } from "../../../helpers"
import useCliente from "../../../hooks/useCliente"
import "./Ordenes.css"
import { ViewProductDetail } from "../../ui/CaseRegister/modal/ViewProductDetail/ViewProductDetail"
import jsPDF from "jspdf"
import { ViewFacture } from "../../ui/ViewFacture/ViewFacture"
const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlPedidosByID = `${import.meta.env.VITE_URL_PEDIDOSBYCLIENTE}/`

export const Ordenes = () => {
    const header = useAccessToken();
    const { user } = useAuth0()
    const cliente = useCliente();
    const [orders, setOrders] = useState<IPedido[]>([])
    const socketState = useSocket({
        connectionUrl: urlWs,
        subscriptionTopic: `/user/${user?.email}/private`
    })
    useEffect(() => {
        const fetchData = async () => {
            if (cliente) {
                await getElementSetState(`${urlPedidosByID}${cliente.id}`, header, setOrders);
            }
        };
        fetchData();
    }, [socketState, cliente]);

    const [product, setProduct] = useState<IPedido | null>(null)

    const printRef = useRef<HTMLElement | null>(null);

    const handleDownloadPDF = () => {
        printRef.current = document.getElementById('divPrint')
        if (printRef.current) {
            const pdf = new jsPDF('p', 'pt', 'letter');
            const printContents = printRef.current;

            pdf.html(printContents, {
                callback: () => {
                    pdf.save('informacion_pedido.pdf');
                }
            });
        }

    };



    return (
        <>
            {
                product &&
                <ViewProductDetail
                    handleClose={() => { setProduct(null) }}
                    pedido={product}
                    width={'90vw'}
                    height={'70vh'}
                />
            }
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
                                    <div style={{ display: 'none' }}>
                                        <ViewFacture pedido={el} />
                                    </div>
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
                                        <button onClick={() => { setProduct(el) }} className="buttoncontainerButtonItemOrder">
                                            Ver
                                        </button>
                                    </div>

                                    <div className="containerButtonItemOrder ">
                                        <button onClick={() => { 
                                            if (el.pagoConfirmado){
                                                handleDownloadPDF() 
                                            }
                                            }} className={`buttoncontainerButtonItemOrder ${el.pagoConfirmado ? '' : 'disabled'}`}>
                                            DescargarFactura
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



*/