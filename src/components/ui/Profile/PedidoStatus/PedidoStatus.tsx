import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PedidoStatus = ({icon, status, color, backgroundColor}:any) => {
    return (
        <div className='profile_pedido-status'>
            <div className='circunferencia-status' style={{ backgroundColor: `${backgroundColor}` }}>
                <FontAwesomeIcon icon={icon} style={{ color: `${color}` }} />
            </div>
            <>{status}</>
        </div>
    )
}

export default PedidoStatus
