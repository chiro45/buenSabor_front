import { useAuth0 } from '@auth0/auth0-react';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { alertError } from '../../../functions/alerts';

const LoginEmployed = () => {
    const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
    const [rol, setRol] = useState('')
    const [invalidRol, setInvalidRol] = useState(false)
    const handleToken = async () => {
        const token = await getAccessTokenSilently();
        const decodedToken: any = jwt_decode(token);
        const roles: any = {
            cocinero: () => setRol('COCINERO'),
            delivery: () => setRol('DELIVERY'),
            cajero: () => setRol('CAJERO'),
        };

        const defaultRole = () => alertError('Ingrese un correo valido', 'ROL INVALIDO');

        const permissions = decodedToken.permissions;

        for (const role in roles) {
            if (permissions.includes(role.toUpperCase())) {
                return roles[role](); // Llama a la función correspondiente al rol encontrado
            }
        }
        setRol('ROL INVALIDO')
        setInvalidRol(true);
        defaultRole(); // Si no se encuentra ningún rol válido, se ejecuta la función defaultRole

    }
    useEffect(() => {
        if (isAuthenticated) {
            if (rol === 'COCINERO') {
                window.location.href = 'http://localhost:5173/kitchen/process';
            } else if (rol === 'DELIVERY') {
                window.location.href = 'http://localhost:5173/deliveryView';
            } else if (rol === 'CAJERO') {
                window.location.href = 'http://localhost:5173/caseRegister/process';
            } else {
                logout({ logoutParams: { returnTo: 'http://localhost:5173/config/loginEmployed' } })
            }
        }
    }, [rol])


    useEffect(() => {
        handleToken(); // Si no se encuentra ningún
    }, [isAuthenticated])



    return (

        <div className="containerPrincipalRegister">
            <div className="containerRegister">

                <div className="register_image-container">
                    <FontAwesomeIcon icon={faAddressCard} size="6x" />
                    <h1>Bienvenido</h1>
                    <p>Inicie sesion para continuar a su modulo de trabajo</p>
                </div>

                <div className='containerbuttonsRegister'>
                    <div className='buttonRegister-register-employed'>
                        <button onClick={() => loginWithRedirect({
                            authorizationParams: {
                                screen_hint: 'signup',
                                redirect_uri: 'http://localhost:5173/config/loginEmployed',
                            },
                        })} className='buttonRegister-register-employed'>
                            Iniciar Sesion
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}


export default LoginEmployed
