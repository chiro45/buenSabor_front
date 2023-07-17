import { useState } from "react";
import { cancelOrder, deliverOrder, handleViewDetail, handleViewFacture, payOrder, sendToKitchen } from "../CaseRegisterTableFunctions";
import { ButtonsTableCaseRegister } from "../ButtonsTable/ButtonsTableCaseRegister";

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
        textButton: 'Ver detalle',
        className: 'btn__actionCaseRegister__viewDetailButton',
        fnOnclick: handleViewDetail
    },
    {
        textButton: 'Ver factura',
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
        textButton: 'Cancelar Pedido',
        className: 'btn__actionCaseRegister__cancelOrder',
        fnOnclick: cancelOrder
    }
]

export const CaseTable = () => {
    const [state, setstate] = useState([{
        numeroPedido: 4244,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'Enviado',
        envio: 'MOTO',
        detallePedido: 'Detalle',
        factura: 'Factura'

    }, {
        numeroPedido: 4243,
        cliente: 'Pepe honguito',
        fecha: '11/04/23',
        estado: 'Enviado',
        envio: 'MOTO',
        detallePedido: 'Detalle',
        factura: 'Factura'

    }])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            arrHead.map(({ text }) => (
                                <th>{text}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {state.map((order) => (
                        <tr key={order.numeroPedido}> {/* Add a unique key prop to each row */}
                            <td>{order.numeroPedido}</td>
                            <td>{order.cliente}</td>
                            <td>{order.fecha}</td>
                            <td>{order.estado}</td>
                            <td>{order.envio}</td>
                            {btnActions.map((button) => (
                                <ButtonsTableCaseRegister
                                    element={order}
                                    className={button.className}
                                    fnOnclick={button.fnOnclick}
                                    textButton={button.textButton}
                                />
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}
