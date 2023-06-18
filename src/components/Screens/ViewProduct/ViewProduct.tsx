
import { useState } from 'react';
import { NavBarMobile } from '../../ui';
import './ViewProduct.css';
import { faArrowLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Footer } from '../../ui/Footer/Footer';

interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
}

interface IViewProductProps {
    product: Product;
}

export const ViewProduct: React.FC<IViewProductProps> = ({ product = {
    name: 'Hamburguesa Triple bacon ultra mega re grande',
    description: 'y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomatecon queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate.con queso, lechuga y tomate..',
    price: 8.99,
    image: 'https://media.istockphoto.com/id/1309352410/es/foto/hamburguesa-con-queso-con-tomate-y-lechuga-en-tabla-de-madera.jpg?s=1024x1024&w=is&k=20&c=eD-BBjoFkwriCJkrPXpl07TrIzLTJs00BciR9oJ9A_g=',
} }) => {

    const { name, description, price, image } = product

    const [cantidad, setCantidad] = useState(1)
    const addCantidad = () => {
        setCantidad(cantidad + 1)
    }
    const restCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const handleAddToCart = () => {

    }
    return (
        <div className='containerPrincipal__productView'>

            <div className='containerbuttonGoToSTore__productView'>
                <button > <Link to={"/store"}><FontAwesomeIcon icon={faArrowLeft} /> Volver a la tienda  </Link></button>
            </div>
            <div className='containerDetailProduct__productView'>
                <div className='containernameProduct__productView'>
                    <div>
                        <h1>{name}</h1>
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

            <Footer/>
        </div>
    );
};

