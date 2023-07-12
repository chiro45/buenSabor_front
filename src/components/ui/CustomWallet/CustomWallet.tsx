import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import '../../Screens/Cart/Cart.css';
import { useState } from 'react';

initMercadoPago(`${import.meta.env.VITE_PUBLIC_MP_KEY}`);

export const CustomWallet = () => {
    const [preferenceId, setPreferenceId] = useState<string>('');
    const [walletActive,setWalletActive] = useState(true);
    const [orderData, setOrderData] = useState({
    quantity: '1',
    price: '10',
    amount: 10,
    description: 'Some book',
  });

  const handleWallet = () => {
    
    setWalletActive(!walletActive);
    fetch(`${import.meta.env.VITE_URL_MP_CREATE_PREF}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        //console.log('PREFERENCE DATA: ', data);
        console.log(data.id);
        setPreferenceId(data.id);
      })
      .catch((error) => {
        console.error(error);
      })
  };


    return (
        <div className="cart_btn-container">
                {walletActive ?
                <button className="cart_btn-pagar" onClick={() =>handleWallet()}>Ir a pagar</button>:
                <Wallet initialization={{ preferenceId: preferenceId }} />}
        </div>)
}
