
import { useEffect, useState } from 'react';
import './ViewProduct.css';
import { faArrowLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../ui/Footer/Footer';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { IArticuloManufacturado } from '../../../interfaces';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeProductActive } from '../../../Redux/Reducers/StoreProductReducers/StoreProductReducer';




interface IcartLocalStorage {
    articuloManufacturado: IArticuloManufacturado
    subtotal: number
    cantidad: number
}

export const ViewProduct: React.FC = () => {

    const itemStore = useSelector((state: any) => state.StoreProductReducer.productActive)
    const [itemActive, setItemActive] = useState<IArticuloManufacturado | null>(null)
    const [cantidad, setCantidad] = useState(0)

    useEffect(() => {
        if (itemStore !== null) {
            setItemActive(itemStore)
            const existingItemIndex = items.filter((el) => el.articuloManufacturado.denominacion === itemStore.denominacion);
            if (existingItemIndex.length > 0) {
                setCantidad(existingItemIndex[0].cantidad)
            }
        }

    }, [itemStore])

    const addCantidad = () => {
        setCantidad(cantidad + 1)
    }
    const restCantidad = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1)
        }
    }

    const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);

    const handleAddCart = () => {
        // setCantidad(0);
        const existingItemIndex = items.findIndex(
            (el) => el.articuloManufacturado.denominacion === itemStore.denominacion
        );
        const updatedItems = [...items];

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].cantidad = cantidad;
            updatedItems[existingItemIndex].subtotal = (cantidad * itemStore.precioVenta);

            if (cantidad === 0) {
                updatedItems.splice(existingItemIndex, 1);
            }
        } else {
            updatedItems.push({
                articuloManufacturado: itemStore,
                subtotal: (cantidad * itemStore.precioVenta),
                cantidad: cantidad
            });
        }

        setItem(updatedItems);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleGoBack = () => {
        dispatch(removeProductActive())
        navigate(-1);
    };


    return (
        <>{
            (itemActive !== null) &&
            <div className='containerPrincipal__productView'>

                <div>
                <div className='containerbuttonGoToSTore__productView'>
                    <button onClick={handleGoBack} > <FontAwesomeIcon icon={faArrowLeft} /> Volver a la tienda  </button>
                </div>
                <div className='containerDetailProduct__productView'>
                    <div className='containernameProduct__productView'>
                        <div>
                            <h1>{itemActive.denominacion}</h1>
                        </div>
                    </div>
                    <div className='containerImgProduct__productView'>
                        <img src={itemActive.imagen} />
                    </div>
                    
                </div>
                </div>

                <div className='containerActions__productView'>
                    <div className='containerDescriptcionAndPRince'>
                    <div className='containerPrice__productView'>
                        <h2>Precio: ${itemActive.precioVenta}</h2>
                    </div>
                    <div className='containerDescripttion__productView'>
                        <div>
                            <p>{itemActive.descripcion}</p>
                        </div>
                    </div>
                    </div>
                    <div className='containerActionProductView'>
                    <div className='container__actions'>
                        <button className='buttonsactions__productView' onClick={addCantidad}> <FontAwesomeIcon icon={faPlus} /> </button>
                        <p> {cantidad}</p>
                        <button className='buttonsactions__productView' onClick={restCantidad}> <FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                    <div className='containerButtonAddCart'>
                        <button className='buttonAddToCart__productView' onClick={handleAddCart}>Añadir al carrito</button>
                    </div>
                    </div>
                </div>

            </div>
        }
        </>
    );
};

{/* <Footer /> */}
