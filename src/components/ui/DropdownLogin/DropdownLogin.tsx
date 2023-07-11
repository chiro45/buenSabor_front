import { useAuth0 } from '@auth0/auth0-react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownLogin.css'

const DropdownLogin = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const [optionDisabled, setOptionDisabled] = useState(false)

    const handleDropdownOptions = () => {
        setOptionDisabled(!optionDisabled)
    }

    return (
        <div className="dropdown_container">
            <button
                className="dropdown-toggle"
                onClick={() => handleDropdownOptions()}
            >
                <FontAwesomeIcon icon={faUser} />
            </button>
            {
                optionDisabled &&
                (isAuthenticated ? (
                    <div className='dropdwon_container-options'>
                        <Link className='dropdown_option' to='/profile'>Perfil</Link>
                        <Link className='dropdown_option' to='/address'>Domicilio</Link>
                        <a
                            className='dropdown_option'
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                            Cerrar Sesion
                        </a>
                    </div>
                ) :
                    <div className='dropdwon_container-options'>
                        <a onClick={() => loginWithRedirect({
                            authorizationParams: {
                                screen_hint: 'signup',
                                redirect_uri: 'http://localhost:5173/address',
                            },
                        })} className='dropdown_option'>
                            Iniciar Sesión
                        </a>

                    </div>)
            }


        </div>
    );
};

export default DropdownLogin
