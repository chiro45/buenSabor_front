
import { Fragment, useEffect, useState } from "react"

import "./ProductStore.css"

import { ItemStore } from "../ItemStore/ItemStore"
import { useSelector } from "react-redux"

export const ProductStore = () => {

    const [titleStore, setTitleStore] = useState('')
    const producstReducer = useSelector((state: any) => state.StoreProductReducer)

    useEffect(() => {
        if (producstReducer.busqueda !== "") {
            setTitleStore("Busqueda: " +producstReducer.busqueda)
        } else if (producstReducer.categoriaActiva !== "") {
            setTitleStore("Categoria: " + producstReducer.categoriaActiva)
        }else{
            setTitleStore("Productos")
        }

    }, [producstReducer.busqueda])

    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(producstReducer.productStore)
    }, [producstReducer.productStore])



    return (
        <div className="containerProductStore__ProductStore">
            <div>
                <div className="containerTitle">
                <b>{titleStore}</b>
                </div>
                {
                    products.length > 0
                        ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            {
                                products.map((el, i) => (
                                    <Fragment key={i}>
                                        <ItemStore itemStore={el} />
                                    </Fragment>
                                ))
                            }
                        </div>
                        : <h1>No hay productos disponibles</h1>
                }
            </div>
        </div>
    )
}
