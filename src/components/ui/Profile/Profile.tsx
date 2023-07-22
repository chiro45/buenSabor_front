import { useAuth0 } from '@auth0/auth0-react';
import { faAt, faCheck, faClockRotateLeft, faLocationDot, faPhone, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../../helpers';
import { EEstadoPedido, ICliente, IPedido } from '../../../interfaces';
import ModalProfile from '../Modals/ModalProfile/ModalProfile';
import PedidoStatus from './PedidoStatus/PedidoStatus';
import './Profile.css'
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem';

const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`
const urlPedidosByCliente = `${import.meta.env.VITE_URL_PEDIDOSBYCLIENTE}`

const Profile = () => {

  const { user, getAccessTokenSilently } = useAuth0();
  let userIdAuth0 = user?.sub?.split('|').pop();
  const [cliente, setCliente] = useState<ICliente>()
  const [pedidos, setPedidos] = useState<IPedido[]>([])
  const [pedidosCompletados, setpedidosCompletados] = useState<number>()
  const [pedidosRechazados, setpedidosRechazados] = useState<number>()
  const [pedidosPendientes, setpedidosPendientes] = useState<number>()
  const navigate = useNavigate();
  useEffect(() => {
    userIdAuth0 = user?.sub?.split('|').pop();
    cargarCliente();
  }, [])
  useEffect(() => {
    if (cliente)
      if (cliente.id !== undefined || cliente.id !== null) {
        cargarPedidos()
      }
  }, [cliente])
  useEffect(() => {
    setpedidosCompletados(pedidos.filter(pedido => pedido.estadoPedido === EEstadoPedido.ENTREGADO).length);
    setpedidosRechazados(pedidos.filter(pedido => pedido.estadoPedido === EEstadoPedido.RECHAZADO).length);
    setpedidosPendientes(pedidos.filter(pedido => pedido.estadoPedido !== EEstadoPedido.ENTREGADO && pedido.estadoPedido !== EEstadoPedido.RECHAZADO).length);
  }, [pedidos])


  const cargarPedidos = async () => {
    const token = await getAccessTokenSilently();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    await fetchGet(`${urlPedidosByCliente}/${cliente?.id}`, headers)
      .then(response => setPedidos(response));
  }
  const cargarCliente = async () => {
    const token = await getAccessTokenSilently();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    await fetchGet(`${urlCliente}/getByUsuarioIdAuth0/${userIdAuth0}`, headers)
      .then(response => setCliente(response));
  }

  let fullDomicilio = ''; // Valor predeterminado si no hay cliente o domicilio

  if (cliente) {
    const { domicilio } = cliente;
    if (domicilio) {
      const { departamento, localidad, calle, numero, piso } = domicilio;
      fullDomicilio = `${departamento ? departamento + ', ' : ''}${localidad ? localidad + ', ' : ''}${calle ? calle + ' - ' : ''}${numero || ''}${piso ? ' Piso: ' + piso : ''}`;
    }
  }
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='profile-section'>
      <div className='profile_container'>

        <div className='profile_btn-container'>
          <button className='profile_btn' onClick={() => handleGoBack()}>Volver</button>
          {
            cliente ? <ModalProfile cliente={cliente} cargarCliente={cargarCliente} /> : null
          }
        </div>
        <div className='profile_picture-container'>
          <img src={user?.picture} />
          <h1>{user?.nickname}</h1>
        </div>
        <div className='profile_pedidos-container'>
          <h2 className='profile_pedidos-title'>Tus Ordenes</h2>
          <div className='profile_pedidos-container-status'>
            <PedidoStatus
              icon={faClockRotateLeft}
              backgroundColor='#FFCC99'
              color='#FF6600'
              status={pedidosPendientes}
            />
            <PedidoStatus
              icon={faCheck}
              backgroundColor='#99FF99'
              color='#00CC00'
              status={pedidosCompletados}
            />
            <PedidoStatus
              icon={faXmark}
              backgroundColor='#FF9999'
              color='#FF3333'
              status={pedidosRechazados} />
          </div>
        </div>

        <div className='profile_information-container'>
          <ProfileInfoItem
            icon={faUser}
            datap={cliente?.nombre && cliente?.apellido ? `${cliente.nombre} ${cliente?.apellido}` : null}
          />
          <ProfileInfoItem
            icon={faPhone}
            datap={cliente?.telefono ? cliente.telefono : null}
          />
          <ProfileInfoItem
            icon={faAt}
            datap={cliente?.email}
          />
          <ProfileInfoItem
            icon={faLocationDot}
            datap={fullDomicilio}
          />
        </div>
      </div>
    </div>)


};

export default Profile;
