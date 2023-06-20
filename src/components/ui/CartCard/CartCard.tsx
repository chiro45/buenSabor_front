import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { IArticuloManufacturado } from '../../../interfaces';
import { ButtonsCartCard } from '../Buttons';

interface IcartLocalStorage {
  itemStore: IArticuloManufacturado
  cantidad: number
}
export const CartCard = ({
  producto,
  cantidad,
  setItem,
  items

}: any) => {
  const [contador, setContador] = useState(1)

  useEffect(() => {
    setContador(cantidad)
  }, [])

  useEffect(() => {
    handleUpdateElementsInLocalStorage()
  }, [contador])


  const handleUpdateElementsInLocalStorage = () => {
    const existingItemIndex = items.findIndex((el: any) => el.itemStore.denominacion === producto.denominacion);

    const updatedItems = [...items];

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].cantidad = contador;

      if (contador === 0) {
        updatedItems.splice(existingItemIndex, 1);
      }
    } else {
      updatedItems.push({
        itemStore: producto,
        cantidad: contador
      });
    }

    setItem(updatedItems);
  }

  const handleIncrement = () => {
    setContador(contador + 1)
  };

  const handleDecrement = () => {
    setContador(contador - 1)
  };

  const handleDelete = () => {
    setContador(contador - 1)
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
            counter={contador}
            deleted={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
