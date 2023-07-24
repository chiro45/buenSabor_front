
import { EEstadoPedido, ETipoEnvio, IPedido } from '../../../../../interfaces';
import { LayoutModalCaseRegister } from '../Layout/LayoutModalCaseRegister'
import { FC, useState } from 'react';

import './DeliveryOrderModal.css'
import { handleUpdateState } from '../../CaseRegisterTableFunctions';
import { useAuth0 } from '@auth0/auth0-react';
export const DeliverOrderMOdal: FC<{ modalEnvio: IPedido, setModalEnvio: Function }> = ({ modalEnvio, setModalEnvio }) => {
    const { getAccessTokenSilently } = useAuth0()
   
    const handleEnvioDelivery = async() => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        handleUpdateState(EEstadoPedido.CAMINO, modalEnvio, headers)
        setModalEnvio(null)
    }
    const handleRetiroEnLocal = async () => {
        const token = await getAccessTokenSilently();
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        handleUpdateState(EEstadoPedido.ENTREGADO, modalEnvio, headers)
        setModalEnvio(null)
    }

    const [optionSelected, setOptionSelected] = useState('')

    const onchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setOptionSelected(selectedOption);

    }

    return (
        <LayoutModalCaseRegister height={'50vh'} width={'40vw'} >


            <div className='containerDeliverOrderMOdal'>
                <div>
                    <h1>Confirmar salida desde la tienda</h1>
                </div>
                {
                    modalEnvio.tipoEnvio === ETipoEnvio.LOCAL &&
                    <div>
                        <button onClick={handleRetiroEnLocal} className='buttonEntregaEnLocal'>Entrega a cliente en local</button>
                    </div>
                }

                {
                    modalEnvio.tipoEnvio === ETipoEnvio.DELIVERY &&
                    <div className='containerEscogeDelivery'>
                        <h2>Escoge Delivery</h2>
                        <div>
                            <select value={optionSelected} onChange={onchangeSelect}>
                                <option>Juancarlos</option>
                                <option>Juancarlos</option>
                                <option>Juancarlos</option>
                                <option>Juancarlos</option>
                            </select>
                        </div>

                        <div className='containerConfirmDelivery'>
                            <div>
                                <button onClick={handleEnvioDelivery}>Confirmar</button>
                            </div>
                        </div>
                    </div>

                }

                <div className='containerCloseMOdalDeliverty'>
                    <button onClick={() => { setModalEnvio (null)}}>Cerrar</button>
                </div>
            </div>
        </LayoutModalCaseRegister>
    )
}
