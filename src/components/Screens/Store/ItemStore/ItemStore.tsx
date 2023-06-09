import { faCheck, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IArticuloManufacturado } from '../../../../interfaces';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import { useDispatch } from 'react-redux';
import { startAddProductActive } from '../../../../Redux/Reducers/StoreProductReducers/StoreProductReducer';
import { useAccessToken } from '../../../../hooks';


interface IItemStore {
    itemStore: IArticuloManufacturado

}

interface IcartLocalStorage {
    itemStore: IArticuloManufacturado
    cantidad: number
}

export const ItemStore: FC<IItemStore> = ({ itemStore }) => {

    const { denominacion, id, imagen, precioVenta } = itemStore
    const [cont, setCont] = useState(0)
    const [showMoreLess, setShoMoreLess] = useState(false)


    const navigate = useNavigate()
    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);

    useEffect(() => {
        if (showMoreLess === true) {
            const existingItemIndex = items.filter((el) => el.itemStore.denominacion === itemStore.denominacion);
            if (existingItemIndex.length > 0) {
                setCont(existingItemIndex[0].cantidad)
            }
        }
    }, [showMoreLess])


    const handleAddCart = () => {
        setCont(0);
        setShoMoreLess(false)
        const existingItemIndex = items.findIndex(
            (el) => el.itemStore.denominacion === itemStore.denominacion
        );
        const updatedItems = [...items];

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].cantidad = cont;

            if (cont === 0) {
                updatedItems.splice(existingItemIndex, 1);
            }
        } else {
            updatedItems.push({
                itemStore,
                cantidad: cont
            });
        }

        setItem(updatedItems);
    };

    const headers = useAccessToken();

    const dispatch = useDispatch()
    const handleViewProduct = () => {
        const url = `${import.meta.env.VITE_URL_ARTICULOMANUFACTURADO}`
        dispatch(startAddProductActive(url, id, headers))
        navigate('/ViewProduct')
    }
    return (
        <div className="productContainer" >
            <div className="containerImg" onClick={() => { handleViewProduct() }}>
                <img className="imgProduct" src={imagen} />
            </div>
            <div className="containerProductDescription">
                <p>{denominacion}</p>
                <p><b>${precioVenta}</b></p>
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
                                onClick={() => { if (cont > 0) setCont(cont - 1) }}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <button
                                className="buttonActionCart confirm"
                                onClick={() => { handleAddCart() }}>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                            <button
                                className="buttonActionCart cancel"
                                onClick={() => {
                                    setShoMoreLess(false)
                                    setCont(1)
                                }}>
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
