
import { EEstadoPedido, ETipoEnvio, IPedido, IUsuario } from '../../../../../interfaces';
import { LayoutModalCaseRegister } from '../Layout/LayoutModalCaseRegister'
import { FC, useEffect, useState } from 'react';

import './DeliveryOrderModal.css'
import { handleUpdateState, handleUpdateStateEnvio } from '../../CaseRegisterTableFunctions';
import { useAuth0 } from '@auth0/auth0-react';
import { alertConfirm, alertSuccess } from '../../../../../functions/alerts';
import { fetchGet } from '../../../../../helpers';

const urlrolDelivery = `${import.meta.env.VITE_URL_USUARIO}/getByRol/${ETipoEnvio.DELIVERY}`
export const DeliverOrderMOdal: FC<{ pedido: IPedido, setModalEnvio: Function }> = ({ pedido: modalEnvio, setModalEnvio }) => {

    const { getAccessTokenSilently, user } = useAuth0()

    const [deliverys, setDeliverys] = useState<IUsuario[]>([])

    const [optionSelected, setOptionSelected] = useState<IUsuario>()
    const handleDeliverys = async () => {
        const token = await getAccessTokenSilently();
        fetchGet(urlrolDelivery, {
            'Authorization': `Bearer ${token}`
        }).then(data => {
            setDeliverys(data)
        })

    }
    useEffect(() => {
        handleDeliverys()
    }, [])

    const handleEnvioDelivery = async () => {
        alertConfirm('¿Entregar pedido?',
            'Confirmar Entrega',
            'Si',
            async () => {
                const token = await getAccessTokenSilently();
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                if (optionSelected) handleUpdateStateEnvio(EEstadoPedido.CAMINO, modalEnvio, headers, optionSelected.idAuth0)
                alertSuccess("Pedido Entregado", 'Correcto')
                setModalEnvio(null)
            },
            'No')

    }

    const handleRetiroEnLocal = async () => {
        alertConfirm('¿Entregar pedido?',
            'Confirmar Entrega',
            'Si',
            async () => {
                const token = await getAccessTokenSilently();
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const idAuth0 = user?.sub?.split('|').pop();
                if (idAuth0) handleUpdateStateEnvio(EEstadoPedido.CAMINO, modalEnvio, headers, idAuth0)
                alertSuccess("Pedido Entregado", 'Correcto')
                setModalEnvio(null)
            },
            'No')

    }

    const onchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        const result = deliverys.find(el => el.usuario === selectedOption)
        setOptionSelected(result);
    }

    return (
        <LayoutModalCaseRegister height={'50vh'} width={'40vw'} >


            <div className='containerDeliverOrderMOdal'>
                <div>
                    <h1>Confirmar salida desde la tienda</h1>
                </div>
                {
                    modalEnvio.tipoEnvio === ETipoEnvio.LOCAL &&
                    <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div>
                            <button onClick={handleRetiroEnLocal} className='buttonEntregaEnLocal'>Entrega a cliente en local</button>
                        </div>
                        <div className='containerCloseMOdalDeliverty'>
                            <button onClick={() => { setModalEnvio(null) }}>Cerrar</button>
                        </div>
                    </div>
                }

                {
                    modalEnvio.tipoEnvio === ETipoEnvio.DELIVERY &&
                    <div className="containerSleectDelivery">
                        <div>
                            <h1>Selecciona el delivery</h1>
                        </div>
                        <div className="containerSelect">
                            <select value={optionSelected?.usuario || ''} onChange={onchangeSelect}>
                                {deliverys.map((option) => (
                                    <option key={option.usuario} value={option.usuario}>
                                        {option.usuario}
                                    </option>
                                ))}
                            </select >
                        </div>
                        <div className="containerButtonsSelectDelivery">
                            <button className="confirm" onClick={handleEnvioDelivery}>Confirmar</button>
                            <button className="cancel" onClick={() => { setModalEnvio(null) }}>Cancelar</button>
                        </div>
                    </div>

                }


            </div>
        </LayoutModalCaseRegister>
    )
}
