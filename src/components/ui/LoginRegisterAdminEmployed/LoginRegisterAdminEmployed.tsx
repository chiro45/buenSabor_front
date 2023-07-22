import { InputGeneric } from "../InputGeneric/InputGeneric"
import "./LoginRegisterAdminEmployed.css"
import { useAuth0, User } from "@auth0/auth0-react"
import { useEffect, useState } from "react"
import { useAccessToken, useInput } from "../../../hooks"
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard } from "@fortawesome/free-solid-svg-icons"
import { alertConfirm, alertError } from "../../../functions/alerts"
import { fetchPost } from "../../../helpers"
import { IUsuario } from "../../../interfaces"
import Swal from "sweetalert2"
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const urlAdminLogoutRegister = `${import.meta.env.VITE_URL_LOGOUT_ADMIN_REGISTER_EMPLOYED}`
const urlAdminLogin = `${import.meta.env.VITE_URL_LOGIN_ADMIN}`
export const LoginRegisterAdminEmployed = () => {
    const header = useAccessToken();
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const [inputState, onInputChange]: any = useInput();
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
        handleToken();
    }, [isAuthenticated])


    const checkAllFieldsFilled = () => {
        const nombre = inputState.usuario;
        return (nombre !== undefined && nombre !== '')
    };
    const handleRegisterEmployed = async () => {
        const idAuth0 = user?.sub?.split('|').pop(); // Utiliza el operador ?? para proporcionar un valor predeterminado '' si idAuth0 es undefined
        if (checkAllFieldsFilled()) {
            const employed = {
                idAuth0: idAuth0,
                usuario: inputState.usuario,
                rol: rol,
            }
            fetchPost(urlUsuario, employed, header)
                .then((response: IUsuario) => Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    text: `${response.usuario} registrado.`
                })
                    .then(() => logout({ logoutParams: { returnTo: urlAdminLogoutRegister } })))
        } else {
            alertError('Complete el nombre antes de continuar', 'Ingrese Nombre');
        }
    };
    const handleCancelEmployed = async () => {
        alertConfirm('', 'Cancelar registro?', 'Si', () => logout({ logoutParams: { returnTo: urlAdminLogoutRegister } }), 'No')

    }


    return (
        <>
            <div className="containerPrincipalRegister">
                {isAuthenticated ?
                    (
                        <div className="containerRegister">
                            <div className="register_image-container">
                                <FontAwesomeIcon icon={faAddressCard} size="6x" />
                                <h1>Registro de empleado</h1>
                                <p>Completa los siguientes campos</p>
                            </div>
                            <div className="register-info_container">
                                <div className="register-inputs_container">
                                    <InputGeneric
                                        placeholder="pepito-honguito"
                                        label="Nombre-Apellido"
                                        className="input-register"
                                        type="text"
                                        name='usuario'
                                        value={inputState.usuario}
                                        onChange={onInputChange}
                                        required={true}
                                    />
                                    <InputGeneric
                                        label="Email"
                                        className="input-register not-allowed"
                                        value={user?.email}
                                        readOnly={true}
                                        required={true}
                                    />
                                    <InputGeneric
                                        label="Puesto"
                                        type="email"
                                        className="input-register not-allowed"
                                        value={rol}
                                        readOnly={true}
                                        required={true}
                                    />
                                </div>
                                <div className='containerbuttonsRegister'>
                                    <div className='buttonRegister-register-employed'>
                                        <button
                                            onClick={() => handleRegisterEmployed()}
                                            disabled={invalidRol}
                                        >Completar Registro</button>
                                    </div>
                                    <div className='buttonRegister-register-employed'>
                                        <button onClick={() => handleCancelEmployed()}>Cancelar Registro</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                    <div className="containerRegister">
                        <div className='containerbuttonsRegister'>
                            <div className='buttonRegister-register-employed'>
                                <button onClick={() => loginWithRedirect({
                                    authorizationParams: {
                                        screen_hint: 'signup',
                                        redirect_uri: urlAdminLogoutRegister,
                                    },
                                })} className='buttonRegister-register-employed'>
                                    Registrar Empleado
                                </button>

                            </div>
                            <div className='buttonRegister-register-employed'>
                                <button onClick={() => loginWithRedirect({
                                    authorizationParams: {
                                        screen_hint: 'signup',
                                        redirect_uri: urlAdminLogin,
                                    },
                                })} className='buttonRegister-register-employed'>
                                    Iniciar Sesion
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>

    )
}
