
import { useState } from 'react';
import './ViewProduct.css';
import { faArrowLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../ui/Footer/Footer';
import { useLocalStorage } from '../../../hooks/useLocalStorage';


export interface IProduct {
    name: string,
    description: string,
    price: number
    image: string
}


export const ViewProduct: React.FC = () => {
    const product = {
        name: 'Hamburguesa Triple bacon ultra mega re grande',
        description: 'y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomatecon queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate..',
        price: 8.99,
        image: 'https://media.istockphoto.com/id/1309352410/es/foto/hamburguesa-con-queso-con-tomate-y-lechuga-en-tabla-de-madera.jpg?s=1024x1024&w=is&k=20&c=eD-BBjoFkwriCJkrPXpl07TrIzLTJs00BciR9oJ9A_g=',
    }
    const { name: nameProduct, description, price, image } = product

    const [cantidad, setCantidad] = useState(1)
    const addCantidad = () => {
        setCantidad(cantidad + 1)
    }
    const restCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const [name, setName] = useLocalStorage<IProduct[]| []>('cart', []);

    const handleAddToCart = () => {
        setName([...name, product])
    }
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div className='containerPrincipal__productView'>

            <div className='containerbuttonGoToSTore__productView'>
                <button onClick={handleGoBack} > <FontAwesomeIcon icon={faArrowLeft} /> Volver a la tienda  </button>
            </div>
            <div className='containerDetailProduct__productView'>
                <div className='containernameProduct__productView'>
                    <div>
                        <h1>{nameProduct}</h1>
                    </div>
                </div>
                <div className='containerImgProduct__productView'>
                    <img src={image} />
                </div>
                <div className='containerPrice__productView'>
                    <h2>Precio: ${price}</h2>
                </div>
                <div className='containerDescripttion__productView'>
                    <div>
                        <p>{description}</p>
                    </div>
                </div>
            </div>

            <div className='containerActions__productView'>
                <div className='container__actions'>
                    <button className='buttonsactions__productView' onClick={addCantidad}> <FontAwesomeIcon icon={faPlus} /> </button>
                    <p> {cantidad}</p>
                    <button className='buttonsactions__productView' onClick={restCantidad}> <FontAwesomeIcon icon={faMinus} /></button>
                </div>
                <div className='containerButtonAddCart'>
                    <button className='buttonAddToCart__productView' onClick={handleAddToCart}>Añadir al carrito</button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

