import { useEffect, useState } from "react";
import { IPedido } from "../../../../interfaces";
import { EEstadoPedido } from '../../../../interfaces/enums/EEstadoPedido';
import { handleUpdateState } from "../../../ui/CaseRegister/CaseRegisterTableFunctions";
import { useAccessToken } from "../../../../hooks";


export const ItemDelivery = ({ element, setProduct }: { element:IPedido, setProduct:Function}) => {

    const [isChecked, setIsChecked] = useState(false);
    const header = useAccessToken();
    const handleChange = () => {
        if (element.estadoPedido !== EEstadoPedido.ENTREGADO && isChecked !== true) {
            setIsChecked(!isChecked);
            handleUpdateState(EEstadoPedido.ENTREGADO, element,header)
        }
    };
    useEffect(()=>{
        if(element.estadoPedido === EEstadoPedido.ENTREGADO){
            setIsChecked(true);
        }
    },[])

    return (
        <div className='containerItemDelivery'>
            <div>1</div>
            <div>
                <label className="switch">
                    <input type="checkbox" 
                    checked={isChecked} 
                    onChange={handleChange} />
                    <span className="slider round" />
                </label>
            </div>
            <div style={{
                width: '100%',
                height: '80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <button className="buttonViewItemOrder" onClick={() => { setProduct(element)}}>Ver</button>
            </div>
            <div><p>{element.domicilio.calle}</p></div>
        </div>
    )
}