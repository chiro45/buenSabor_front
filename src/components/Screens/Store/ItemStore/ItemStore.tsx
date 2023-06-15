import { faCheck, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const ItemStore = () => {
    const [cont, setCont] = useState(0)
    const [showMoreLess, setShoMoreLess] = useState(false)

    const handleSubmitCart = () => {
        setShoMoreLess(false)
        //envio del item al cart
    }

    return (
        <div className="productContainer">
            <div className="containerImg">
                <img className="imgProduct" src="https://www.infobae.com/new-resizer/sh0cQBavobeT-OvaLzu-VP5mi5A=/992x558/filters:format(webp):quality(85)/arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/FJKXKQKMMJBV7KQ7XQ3YNFO7LU.jpg" />
            </div>
            <div className="containerProductDescription">
                <p>Hamburguesa doble cheddar, con guacamole</p>
                <p><b>$2300</b></p>
                {
                    showMoreLess
                        ?
                        <div className="containerAddCart" >
                            <p><b>Cantidad:</b> {cont}</p>
                            <button
                                className="buttonActionCart plus"
                                onClick={() => { setCont(cont + 1) }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button
                                className="buttonActionCart minus"
                                onClick={() => { setCont(cont - 1) }}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <button
                                className="buttonActionCart confirm"
                                onClick={() => { handleSubmitCart }}>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                                className="buttonActionCart cancel"
                                onClick={() => setShoMoreLess(false)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                        :
                        <div className="buttonCart" onClick={() => setShoMoreLess(true)}>
                            <button>Añadir al carrito <FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                }
            </div>
        </div>
    )
}
