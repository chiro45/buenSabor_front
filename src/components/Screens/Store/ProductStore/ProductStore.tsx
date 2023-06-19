
import { useState } from "react"

import "./ProductStore.css"

import { ItemStore } from "../ItemStore/ItemStore"

export const ProductStore = () => {

    const [titleStore, setTitleStore] = useState('Hamburguesas')
    const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

    return (
        <div className="containerProductStore__ProductStore">
            <div>
                <div className="containerTitle">
                    <b>Busqueda: {titleStore}</b>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {
                        products.map(el => (
                            <ItemStore />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
