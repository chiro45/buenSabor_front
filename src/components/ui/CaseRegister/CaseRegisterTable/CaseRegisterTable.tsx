import { useState } from "react"
import { cancelOrder, deliverOrder, handleViewDetail, handleViewFacture, payOrder, sendToKitchen } from "../CaseRegisterTableFunctions";
import { ButtonsTableCaseRegister } from "../ButtonsTable/ButtonsTableCaseRegister";

import './CaseRegisterTable.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMotorcycle, faShop } from "@fortawesome/free-solid-svg-icons";

interface TableHeader {
    text: string;
}

const arrHead: TableHeader[] = [
    { text: 'N.º de pedido' },
    { text: 'Cliente' },
    { text: 'Fecha' },
    { text: 'Estado' },
    { text: 'Envio' },
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

const arrElements = [
    {
        numeroPedido: 4244,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'atiempo',
        envio: 'retiroEnLocal',
        detallePedido: 'Detalle',
        factura: 'Factura'

    }, {
        numeroPedido: 4243,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'enviado',
        envio: 'delivery',
        detallePedido: 'Detalle',
        factura: 'Factura'

    },
    {
        numeroPedido: 4244,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'cancelado',
        envio: 'retiroEnLocal',
        detallePedido: 'Detalle',
        factura: 'Factura'

    },
    {
        numeroPedido: 4244,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'preparado',
        envio: 'retiroEnLocal',
        detallePedido: 'Detalle',
        factura: 'Factura'

    },
    {
        numeroPedido: 4244,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'demorado',
        envio: 'retiroEnLocal',
        detallePedido: 'Detalle',
        factura: 'Factura'

    }
]

export const CaseTable = () => {
    const [state, setstate] = useState(arrElements) 
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
                        state.map((order: any, index: number) => (
                            <div
                                key={order.numeroPedido}
                                className={` trBodyCaseRegister ${(index + 1) % 2 === 0 ? 'oscuro' : 'claro'}`}>
                                <div><p>{order.numeroPedido}</p></div>
                                <div><p>{order.cliente}</p></div>
                                <div><p>{order.fecha}</p></div>
                                <div >{handleStateOrder(order.estado)}</div>
                                <div><p>{handleTypeEnvio(order.envio)}</p></div>
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
    if (state === "delivery") {
        return <FontAwesomeIcon icon={faMotorcycle} />
    } else {
        return <FontAwesomeIcon icon={faShop} />
    }
}

const handleStateOrder = (state: string) => {
    let text = ''
    let classname = ''
    switch (state) {
        case 'atiempo':
            text = "A tiempo"
            classname = 'atiempo'
            break;
        case 'demorado':
            text = "Demorado"
            classname = 'demorado'
            break;
        case 'enviado':
            text = "Enviado"
            classname = 'enviado'
            break;
        case 'espera':
            text = "En espera"
            classname = 'espera'
            break;
        case 'preparado':
            text = "Preparado"
            classname = 'preparado'
            break;
        case 'cancelado':
            text = "Cancelado"
            classname = 'cancelado'
            break;
    }
    return <p className={classname}>{text}</p>
}
