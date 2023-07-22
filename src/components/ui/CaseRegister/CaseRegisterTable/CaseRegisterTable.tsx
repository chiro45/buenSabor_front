import { useEffect, useState } from "react"
import { ButtonsTableCaseRegister } from "../ButtonsTable/ButtonsTableCaseRegister";

import './CaseRegisterTable.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle, faShop } from "@fortawesome/free-solid-svg-icons";
import { EEstadoPedido, IPedido } from "../../../../interfaces";
import { getElementSetState } from "../../../../helpers";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../../hooks/useSocket";
import { useAuth0 } from "@auth0/auth0-react";

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
    conditions: EEstadoPedido[]
    fnOnclick: 'viewDetail' | 'viewFacture' | 'sendtoKittchen' | 'payOrder' | 'cancelOrder' | 'deliverOrder';
}

const {
    ENTREGADO,
    CAMINO,
    PENDIENTE,
    ESPERA,
    PREPARACION,
    PREPARADO,
    RECHAZADO
} = EEstadoPedido
const btnActions: ActionButton[] = [
    {
        textButton: 'Ver',
        className: 'btn__actionCaseRegister__viewDetailButton',
        fnOnclick: 'viewDetail',
        conditions: [
            ENTREGADO,
            CAMINO,
            PENDIENTE,
            ESPERA,
            PREPARACION,
            PREPARADO,
            RECHAZADO
        ]
    },
    {
        textButton: 'Ver',
        className: 'btn__actionCaseRegister__viewFactureButton',
        fnOnclick: 'viewFacture',
        conditions: []
    },
    {
        textButton: 'Enviar a cocina',
        className: 'btn__actionCaseRegister__sendToKitchen',
        fnOnclick: 'sendtoKittchen',
        conditions: [PENDIENTE]
    },
    {
        textButton: 'Pagar',
        className: ' btn__actionCaseRegister__payOrder',
        fnOnclick: 'payOrder',
        conditions: [
            CAMINO,
            PENDIENTE,
            ESPERA,
            PREPARACION,
            PREPARADO,
        ]
    },
    {
        textButton: 'Entregar',
        className: 'btn__actionCaseRegister__deliverOrder',
        fnOnclick: 'deliverOrder',
        conditions: [PREPARADO] // ver

    },
    {
        textButton: 'Cancelar',
        className: 'btn__actionCaseRegister__cancelOrder',
        fnOnclick: 'cancelOrder',
        conditions: [PENDIENTE, ESPERA]

    }
]

const urlWs = `${import.meta.env.VITE_URL_WS}`;
const urlEspera = `${import.meta.env.VITE_URL_PEDIDOS}/allCaja`
const urlEntregadoAndRejected = `${import.meta.env.VITE_URL_PEDIDOS}/rejectedAndDelivered`

export const CaseTable = () => {
    const [state, setstate] = useState<IPedido[]>([])
    const {getAccessTokenSilently} = useAuth0()
    const { pathname } = useLocation();
    const socketState = useSocket({
        connectionUrl: urlWs, subscriptionTopic: `/pedidows/public`
    })
    const fetchData = async(url:any, setPedido:any) =>{
        const token = await getAccessTokenSilently();
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        getElementSetState(url, headers, setPedido);
    }
    useEffect(() => {
        if (pathname === "/caseRegister/process") {
            fetchData(urlEspera, setstate);
        } else if (pathname === "/caseRegister/done") {
            fetchData(urlEntregadoAndRejected, setstate);
        }
        console.log('meactualizo')
    }, [pathname, socketState]);


    return (
        <div className="containerTableCaseRegister">

            <div className="tableCaseRegister">

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
                                <div className="divtrBody"><p>{order.numero}</p></div>
                                <div className="divtrBody"><p>{order.cliente.usuario.usuario.split('@').shift()}</p></div>
                                <div className="divtrBody"><p>{`${order.fecha.toString().slice(0, 10)}`}</p></div>
                                <div className="divtrBody" >{handleStateOrder(order.estadoPedido)}</div>
                                <div className="divtrBody"><p>{handleTypeEnvio(order.tipoEnvio)}</p></div>
                                <div className="divtrBody"><p>${order.monto}</p></div>
                                {btnActions.map((button) => (
                                    <ButtonsTableCaseRegister
                                        element={order}
                                        className={button.className}
                                        fnOnclick={button.fnOnclick}
                                        conditions={button.conditions}
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
