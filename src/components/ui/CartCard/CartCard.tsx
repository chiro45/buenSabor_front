import { ButtonsCartCard } from '../Buttons';


export const CartCard = ({
  producto,
  increment,
  decrement,
  counter,
  handleDeleted,
  productId
}: any) => {
  const handleIncrement = () => {
    increment(productId);
  };

  const handleDecrement = () => {
    decrement(productId);
  };
  
  const handleDelete = () => {
    handleDeleted(productId);
  };

  return (
    <div className="cart_card">
      <div className="cart_card-container">
        <img className="cart_card-img" src={producto.imagen} alt="Imagen producto" />
        <div className="cart_card-info">
          <h3>{producto.denominacion}</h3>
          <p>{producto.descripcion}</p>
        </div>
        <div className="cart_card-btnPrice">
          <h2>${producto.precioVenta}</h2>
          <ButtonsCartCard
            increment={handleIncrement}
            decrement={handleDecrement}
            counter={counter[productId] || 1}
            deleted={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
