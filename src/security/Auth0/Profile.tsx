import { useAuth0 } from '@auth0/auth0-react';
import { faAt, faCheck, faClockRotateLeft, faLocationDot, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../helpers';
import { useAccessToken } from '../../hooks';
import { ICliente } from '../../interfaces';
import './Profile.css'

const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`

const Profile = () => {

  const { user } = useAuth0();
  const userIdAuth0 = user?.sub?.split('|').pop();
  const headers = useAccessToken();
  const [cliente, setCliente] = useState<ICliente>()
  const navigate = useNavigate();
  useEffect(() => {
    cargarCliente();

  }, [])

  const cargarCliente = async () => {
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
          <button className='profile_btn'>Modificar</button>
        </div>
        <div className='profile_picture-container'>
          <img src={user?.picture} />
          <h1>{user?.nickname}</h1>
        </div>
        <div className='profile_pedidos-container'>
          <h2 className='profile_pedidos-title'>Tus Ordenes</h2>
          <div className='profile_pedidos-container-status'>
            <div className='profile_pedido-status'>
              <div className='circunferencia-status' style={{ backgroundColor: '#FFCC99' }}>
                <FontAwesomeIcon icon={faClockRotateLeft} style={{ color: '#FF6600' }} />
              </div>
              {/* pedidosCompletados */}
              5
            </div>
            <div className='profile_pedido-status'>
              <div className='circunferencia-status' style={{ backgroundColor: '#99FF99' }}>
                <FontAwesomeIcon icon={faCheck} style={{ color: '#00CC00' }} />
              </div>
              {/* pedidosCompletados */}
              5
            </div>
            <div className='profile_pedido-status'>
              <div className='circunferencia-status' style={{ backgroundColor: '#FF9999' }}>
                <FontAwesomeIcon icon={faXmark} style={{ color: '#FF3333' }} />
              </div>
              {/* pedidosCompletados */}
              5
            </div>


          </div>
        </div>

        <div className='profile_information-container'>
          <div className='profile_information-item'>
            <FontAwesomeIcon icon={faPhone} />
            <p>{cliente?.telefono}</p>
          </div>
          <div className='profile_information-item'>
            <FontAwesomeIcon icon={faAt} />
            <p>{cliente?.email}</p>
          </div>
          <div className='profile_information-item'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{fullDomicilio}</p>
          </div>
        </div>
      </div>
    </div>)


};

export default Profile;
