import { useEffect, useState } from "react"
import { cancelOrder, deliverOrder, handleViewDetail, handleViewFacture, payOrder, sendToKitchen } from "../CaseRegisterTableFunctions";
import { ButtonsTableCaseRegister } from "../ButtonsTable/ButtonsTableCaseRegister";

import './CaseRegisterTable.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle, faShop } from "@fortawesome/free-solid-svg-icons";
import { EEstadoPedido, IPedido } from "../../../../interfaces";
import { getElementSetState } from "../../../../helpers";
import { useAccessToken } from "../../../../hooks";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../../hooks/useSocket";

interface TableHeader {
    text: string;
}

const arrHead: TableHeader[] = [
    { text: 'N.º de pedido' },
    { text: 'Cliente' },
    { text: 'Fecha' },
    { text: 'Estado' },
    { text: 'Envio' },
    { text: 'Monto' },
    { text: 'DetallePedido' },
    { text: 'Factura' },
    { text: 'Enviar a cocina' },
    { text: 'Pagar' },
    { text: 'Entregar' },
    { text: 'Cancelar Pedido' }
];

interface ActionButton {
    textButton: string;
    className: string;
    fnOnclick: () => void;
}

const btnActions: ActionButton[] = [
    {
        textButton: 'Ver',
        className: 'btn__actionCaseRegister__viewDetailButton',
        fnOnclick: handleViewDetail
    },
    {
        textButton: 'Ver',
        className: 'btn__actionCaseRegister__viewFactureButton',
        fnOnclick: handleViewFacture
    },
    {
        textButton: 'Enviar a cocina',
        className: 'btn__actionCaseRegister__sendToKitchen',
        fnOnclick: sendToKitchen
    },
    {
        textButton: 'Pagar',
        className: ' btn__actionCaseRegister__payOrder',
        fnOnclick: payOrder
    },
    {
        textButton: 'Entregar',
        className: 'btn__actionCaseRegister__deliverOrder',
        fnOnclick: deliverOrder
    },
    {
        textButton: 'Cancelar',
        className: 'btn__actionCaseRegister__cancelOrder',
        fnOnclick: cancelOrder
    }
]

const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlEspera = `${import.meta.env.VITE_URL_PEDIDOS}/allCaja`
const urlEntregadoAndRejected = `${import.meta.env.VITE_URL_PEDIDOS}/rejectedAndDelivered`

export const CaseTable = () => {
    const [state, setstate] = useState<IPedido[]>([])

    const header = useAccessToken();
    const { pathname } = useLocation();
    const socketState = useSocket({
        connectionUrl: urlWs, subscriptionTopic: `/pedidows/public`
    })
    useEffect(() => {
        if (pathname === "/caseRegister/process") {
            getElementSetState(urlEspera, header, setstate);
        } else if (pathname === "/caseRegister/done") {
            getElementSetState(urlEntregadoAndRejected, header, setstate);
        }
        console.log('meactualizo')
    }, [pathname, socketState]);



    return (
        <div className="containerTableCaseRegister">
            <h1>{state.length}</h1>
            <div className="tableCaseRegister">
                <div><button></button></div>
                <div className="theadCaseRegister">
                    {arrHead.map(({ text }) => (
                        <div>
                            <p key={text}>{text}</p>
                        </div>
                    ))}
                </div>
                <div className="tbodycaseRegister">
                    {
                        state.length > 0 &&
                        state.map((order, index: number) => (
                            <div
                                key={order.id}
                                className={` trBodyCaseRegister ${(index + 1) % 2 === 0 ? 'oscuro' : 'claro'}`}>
                                <div><p>{order.numero}</p></div>
                                <div><p>{order.cliente.usuario.usuario.split('@').shift()}</p></div>
                                <div><p>11/04/01</p></div>
                                <div >{handleStateOrder(order.estadoPedido)}</div>
                                <div><p>{handleTypeEnvio(order.tipoEnvio)}</p></div>
                                <div><p>${order.numero}</p></div>
                                {btnActions.map((button) => (
                                    <ButtonsTableCaseRegister
                                        element={order}
                                        className={button.className}
                                        fnOnclick={button.fnOnclick}
                                        textButton={button.textButton}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

const handleTypeEnvio = (state: string) => {
    if (state === "DELIVERY") {
        return <FontAwesomeIcon icon={faMotorcycle} />
    } else if ("LOCAL") {
        return <FontAwesomeIcon icon={faShop} />
    }
}

const handleStateOrder = (state: string) => {
    let text = "";
    let classname = "";
    switch (state) {
        case EEstadoPedido.PENDIENTE:
            text = "Pendiente";
            classname = "pendiente";
            break;
        case EEstadoPedido.PREPARACION:
            text = "Preparación";
            classname = "preparacion";
            break;
        case EEstadoPedido.CAMINO:
            text = "Enviado";
            classname = "enviado";
            break;
        case EEstadoPedido.ESPERA:
            text = "En espera";
            classname = "espera";
            break;
        case EEstadoPedido.ENTREGADO:
            text = "Entregado";
            classname = "entregado";
            break;
        case EEstadoPedido.RECHAZADO:
            text = "Cancelado";
            classname = "cancelado";
            break;
        case EEstadoPedido.PREPARADO:
            text = "Preparado";
            classname = "entregado";
            break;
    }
    return <p className={classname}>{text}</p>;
};
