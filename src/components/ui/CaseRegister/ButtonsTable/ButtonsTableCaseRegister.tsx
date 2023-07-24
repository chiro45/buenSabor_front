import { FC, useState } from 'react';
import './ButtonsTableCaseRegister.css'
import { EEstadoPedido, IPedido } from '../../../../interfaces';
import { useAccessToken } from '../../../../hooks';
import { cancelOrder, payOrder, sendToKitchen } from "../CaseRegisterTableFunctions";
import { ViewProductDetail } from '../modal/ViewProductDetail/ViewProductDetail';

import { DeliverOrderMOdal } from '../modal/DeliverORderModal/DeliverOrderMOdal';
import { FacturaModal } from '../modal/Factura/FacturaMOdal';
interface ActionButton {
    element: IPedido,
    textButton: string;
    className: string;
    conditions: EEstadoPedido[]
    fnOnclick: 'viewDetail' | 'viewFacture' | 'sendtoKittchen' | 'payOrder' | 'cancelOrder' | 'deliverOrder';

}


export const ButtonsTableCaseRegister: FC<ActionButton> = ({ element, className, fnOnclick, textButton, conditions }) => {
    const header = useAccessToken();

    const handleOnclickButton = () => {
        if (fnOnclick === 'viewDetail') {
            setProduct(element)
        }
        else if (fnOnclick === 'viewFacture') {
            setFacture(element)
        } else if (fnOnclick === 'cancelOrder') {
            cancelOrder(element, header)
        } else if (fnOnclick === 'payOrder') {
            payOrder(element, header)
        } else if (fnOnclick === 'deliverOrder') {
            setModalEnvio(element)
        } else if (fnOnclick === 'sendtoKittchen') {
            sendToKitchen(element, header)
        }
    }

    const handleState = () => {
        const pedidoState = element.estadoPedido
        if (conditions.includes(pedidoState) || className === 'btn__actionCaseRegister__viewFactureButton' && element.pagoConfirmado === true) {
            return className
        } else {
            return "disabled"
        }

    }

    const [product, setProduct] = useState<IPedido | null>(null)
    const [facture, setFacture] = useState<IPedido | null>(null)
    const [modalEnvio, setModalEnvio] = useState<IPedido | null>(null)


    return (
        <div className='container__ButtonsTableCaseRegister'>
            {
                product &&
                <ViewProductDetail
                    handleClose={() => { setProduct(null) }}
                    pedido={product}
                    width={'40vw'}
                    height={'55vh'}
                />
            }

            {
                facture &&
                <FacturaModal
                    setFacture={setFacture}
                    facture={facture}
                />
            }
            {modalEnvio &&
                <DeliverOrderMOdal 
                    modalEnvio={modalEnvio} 
                    setModalEnvio={setModalEnvio} 
                
                />
            }


            <button key={element.numero}
                className={` ${handleState()}`}
                onClick={handleOnclickButton}>
                {textButton}
            </button>
        </div>
    )
}
