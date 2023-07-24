import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import '../../Screens/Cart/Cart.css';
import { useEffect, useState } from 'react';
import { EEstadoPedido, EFormaPago, ETipoEnvio, IDetalleArticuloManufacturado, IPedido } from '../../../interfaces';
import useCliente from '../../../hooks/useCliente';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { fetchPost } from '../../../helpers';
import { alertError } from '../../../functions/alerts';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IcartLocalStorage } from '../../Screens/Cart';

initMercadoPago(`${import.meta.env.VITE_PUBLIC_MP_KEY}`);

const urlPedido = `${import.meta.env.VITE_URL_PEDIDOS}`
export const CustomWallet = () => {
  const [preferenceId, setPreferenceId] = useState();
  const [walletActive, setWalletActive] = useState(true);
  const [pedido, setPedido] = useLocalStorage<IPedido | {}>('cartPedido', {});
  const [items, setItem] = useLocalStorage<IcartLocalStorage[] | []>('cart', []);
  const { getAccessTokenSilently } = useAuth0();
  const cliente = useCliente();
  const navigate = useNavigate();


  const handlePostPedido = async () => {
    const storedPedido: IPedido = JSON.parse(localStorage.getItem('cartPedido') || 'null');
    const storedEnvio: ETipoEnvio = JSON.parse(localStorage.getItem('carttipoEnvio') || 'null');
    const storedPago: EFormaPago = JSON.parse(localStorage.getItem('cartformaPago') || 'null');
    const storedDetalles: IDetalleArticuloManufacturado = JSON.parse(localStorage.getItem('cart') || 'null');
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset(); // Obtener el desplazamiento de la zona horaria en minutos
    currentDate.setMinutes(currentDate.getMinutes() - offset); // Ajustamos la fecha y hora para tu zona horaria
    const fechaFormateada = currentDate.toISOString();
    const fechaHastaMinutos = fechaFormateada.slice(0, 16);
    const token = await getAccessTokenSilently();
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const data = {
      ...storedPedido,
      detallePedidos: storedDetalles,
      estadoPedido: EEstadoPedido.PENDIENTE,
      cliente: cliente,
      domicilio: cliente?.domicilio,
      fecha: fechaHastaMinutos,
      formaPago: storedPago,
      tipoEnvio: storedEnvio
    }
    setPedido(data)
    if (storedPago === EFormaPago.EFECTIVO) {
      fetchPost(urlPedido, data, headers)
        .then((response) => Swal.fire({
          icon: 'success',
          title: 'Pedido realizado',
          text: `Pedido ${response.id} registrado.`
        })).then(() => {
          setPedido({})
          setItem([])
        })
        .then(() => navigate('/order'))
        .catch(() => {
          alertError('Error al realizar pedido', 'Intente nuevamente')
        })
    } else {
      handleWallet(data)
    }
  }

  const handleWallet = async (data:any) => {
    setWalletActive(!walletActive);
    fetch(`${import.meta.env.VITE_URL_MP_CREATE_PREF}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: data.monto, title: 'Compra en Ven rapido y sabroso' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPreferenceId(data.id);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  useEffect(() => {
    const handleResponseMp = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const success = urlParams.get('success');
      const token = await getAccessTokenSilently();
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      if (success === 'true') {
        fetchPost(urlPedido, { ...pedido, pagoConfirmado: true }, headers)
          .then((response) => Swal.fire({
            icon: 'success',
            title: 'Pedido realizado',
            text: `Pedido ${response.id} registrado.`
          }))
          .then(() => {
            setPedido({})
            setItem([])
          })
          .then(() => navigate('/order'))
      } else if (success === 'false') {
        //Aca hay que devolver el dinero de alguna forma TODO
        alertError("Error al concretar pedido", "Error de Pago")
      }
    }
    handleResponseMp();
  }, [])

  return (
    <div className="cart_btn-container">
      {walletActive ?
        <button className="cart_btn-pagar" disabled={items.length === 0} onClick={() => handlePostPedido()}>Ir a pagar</button> :
        ((preferenceId !== undefined && preferenceId !== null)&&
          <Wallet initialization={{ preferenceId: preferenceId }} />
        ) 
      }
    </div>)
}
