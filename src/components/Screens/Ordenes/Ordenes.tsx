import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavBarMobile } from "../../ui"
import "./Ordenes.css"
import { faArrowLeft, faBagShopping } from "@fortawesome/free-solid-svg-icons"

export const Ordenes = () => {

    const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    return (
        <>
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
                            arr.map((el: any) => (
                                <div className="containerItemOrder">
                                    <div className="containerDescriptionOrders">
                                        <div style={{width:'24%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <FontAwesomeIcon fontSize={'4vh'} icon={faBagShopping} />
                                        </div>
                                        <div style={{width:'75%'}}>
                                            <p><b>Número de pedido: </b>1234</p>
                                            <p><b>Estado:</b> Entregado</p>
                                        </div>
                                    </div>
                                    <div className="containerButtonItemOrder">
                                        <button className="buttoncontainerButtonItemOrder">
                                            Ver
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
