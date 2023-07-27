import { useAuth0 } from '@auth0/auth0-react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserRole from '../../../hooks/useUserRole';
import './DropdownLogin.css'

const urlEmployedLoginLogout = `${import.meta.env.VITE_URL_LOGIN_LOGOUT_EMPLOYED}`;
const urladminLogout = `${import.meta.env.VITE_URL_LOGOUT_ADMIN_REGISTER_EMPLOYED}`;
const urlBaseFront = `${import.meta.env.VITE_FRONT_BASE}`
const DropdownLogin = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { rol, loading } = useUserRole();
  const [optionDisabled, setOptionDisabled] = useState(false);

  const handleDropdownOptions = () => {
    setOptionDisabled(!optionDisabled);
  };
  return (
    <div className="dropdown_container">
      <button className="dropdown-toggle" onClick={() => handleDropdownOptions()}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {optionDisabled && (
        <div className='dropdwon_container-options'>
          {isAuthenticated ? (
            rol === 'CLIENTE' ? (
              // Si el rol es CLIENTE y está autenticado, mostrar opciones específicas para CLIENTE
              <>
                <Link className='dropdown_option' to='/profile'>Perfil</Link>
                <Link className='dropdown_option' to='/address'>Domicilio</Link>
                <Link className='dropdown_option' to='/order'>Pedidos</Link>
                <a className='dropdown_option' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Cerrar Sesión
                </a>
              </>
            ) : rol === 'ADMIN' ? (
              // Si el rol es ADMIN y está autenticado, mostrar opciones para cerrar sesión con URL específica
               <a className='dropdown_option' onClick={() => logout({ logoutParams: { returnTo: urladminLogout } })}>
                Cerrar Sesión
              </a>
             
            ) : (
              // Si no es CLIENTE ni ADMIN, pero está autenticado, mostrar opciones para cerrar sesión
              <a className='dropdown_option' onClick={() => logout({ logoutParams: { returnTo: urlEmployedLoginLogout } })}>
                Cerrar Sesión
              </a>
            )
          ) : (
            // Si no está autenticado, mostrar opción para iniciar sesión
            <a
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: 'signup',
                    redirect_uri: `${urlBaseFront}/address`,
                  },
                })}
              className='dropdown_option'>
              Iniciar Sesión
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownLogin;