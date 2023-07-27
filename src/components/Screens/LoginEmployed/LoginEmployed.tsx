import { useAuth0 } from '@auth0/auth0-react';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { alertError } from '../../../functions/alerts';
import Swal from 'sweetalert2';

const urlEmployedLoginLogout = `${import.meta.env.VITE_URL_LOGIN_LOGOUT_EMPLOYED}`
const urlBase = `${import.meta.env.VITE_FRONT_BASE}`
const LoginEmployed = () => {
    const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout, isLoading } = useAuth0();
    const [rol, setRol] = useState('')
    const [loading, setLoading] = useState(false)
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
                window.location.href = `/kitchen/process`;
            } else if (rol === 'DELIVERY') {
                window.location.href = `/deliveryView`;
            } else if (rol === 'CAJERO') {
                window.location.href = `/caseRegister/proces`;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Acceso Denegado',
                    text: 'Credenciales invalidas, intente nuevamente'
                }).then(() =>
                    logout({ logoutParams: { returnTo: urlEmployedLoginLogout } })
                )
            }
        }
    }, [rol])


    useEffect(() => {
        handleToken(); // Si no se encuentra ningún
    }, [isAuthenticated])

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                setLoading(true);
            }
        }
    }, [isLoading]);

    return (
        <div className="containerPrincipalRegister">
            <div className="containerRegisterEmployed">
                <div className="register_image-container">
                    <FontAwesomeIcon icon={faAddressCard} size="6x" />
                    <h1>Bienvenido</h1>
                    <p>Inicie sesión para continuar a su módulo de trabajo</p>
                </div>

                <div className="containerbuttonsRegister">
                    {(loading || isLoading) ? (
                        <div className='buttonRegister-register-employed'>
                            <button className='buttonRegister-register-employed'>
                                Cargando...
                            </button>
                        </div>
                    ) : (
                        <div className='buttonRegister-register-employed'>
                            <button onClick={() => loginWithRedirect({
                                authorizationParams: {
                                    screen_hint: 'signup',
                                    redirect_uri: urlEmployedLoginLogout,
                                },
                            })} className='buttonRegister-register-employed'>
                                Iniciar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default LoginEmployed
