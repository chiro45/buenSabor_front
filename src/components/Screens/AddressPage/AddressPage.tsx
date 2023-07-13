import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import { InputGeneric } from "../../ui"
import { fetchGet, fetchPost, fetchPut} from "../../../helpers";
import { useAccessToken, useInput } from "../../../hooks";
import { ICliente} from "../../../interfaces";
import logo from '../../../assets/logopng.webp'
import "./AddressPage.css"
const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`
const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`

export const AddressPage = () => {
    const headers = useAccessToken();
    const { user, isAuthenticated,  getAccessTokenSilently } = useAuth0();
    const [clientePost, setClientePost] = useState<ICliente | any>();
    const [clienteDB, setClienteDB] = useState<ICliente>()
    const [inputState, onInputChange, setInputState]: any = useInput();
    const [authDataLoaded, setAuthDataLoaded] = useState(false);
    const navigate = useNavigate();
    const widthInputColum = "100%"

    useEffect(() => {
      if (!authDataLoaded && isAuthenticated) {
        setAuthDataLoaded(true);
        firstPostCliente();
      }
    }, [isAuthenticated, authDataLoaded]);

    useEffect(() => {
        if (authDataLoaded) {
          existsCliente();
        }
      }, [clientePost, authDataLoaded]);

    const firstPostCliente = async () => {
        if (isAuthenticated) {
            try {
                const token = await getAccessTokenSilently();
                const decodedToken: any = jwt_decode(token);
                const userId = decodedToken.sub.split('|').pop(); // ID del usuario
                setClientePost({
                    nombre: user?.given_name || '',
                    apellido: user?.family_name || '',
                    email: user?.email || '',
                    usuario: {
                        idAuth0: userId,
                        usuario: user?.email || '',
                        rol: 'CLIENTE',
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
    const existsCliente = async () => {
        if (clientePost) {
            const response = await fetchGet(`${urlUsuario}/getByUsuario/${clientePost.usuario.usuario}`, headers);
            if (response == '') {
                fetchPost(urlCliente, clientePost, headers)
                    .then((response) => setClienteDB(response));
            } else {
                const cliente: ICliente = await fetchGet(`${urlCliente}/getByUsuarioId/${response.id}`, headers);
                setClienteDB(cliente);
                if (cliente.domicilio !== null) {
                    setInputState({
                        calle: cliente.domicilio.calle,
                        localidad: cliente.domicilio.localidad,
                        numero: cliente.domicilio.numero,
                        departamento: cliente.domicilio.departamento,
                        piso: cliente.domicilio.piso
                    })
                }
            }
        }
    };
    const handleDomicilio = async () => {
        const domicilio = {
            id: clienteDB?.domicilio?.id || '',
            calle: inputState.calle,
            localidad: inputState.localidad,
            numero: inputState.numero,
            departamento: inputState.departamento,
            piso: inputState.piso
        }
        const data = {
            ...clienteDB,
            domicilio: domicilio
        }
         fetchPut(`${urlCliente}/${clienteDB?.id}`, data, headers).then(()=>{
            navigate('/')
         }
         );
    }


    return (
        <>
            <div className="containerPrincipalRegister">
                <div className="containerRegister">
                    <div className="register_image-container">
                        <img src={logo} className="register_logo" />
                        <h1>Ven rapido y sabroso</h1>
                        <p>Empieza a disfrutar de nuestros servicios</p>
                    </div>
                    <div className="register-info_containerSecond">
                        <div className="register-inputs_containerSecond">
                            <InputGeneric
                                placeholder="Buena nueva"
                                label="Calle"
                                width={widthInputColum}
                                name='calle'
                                className="input-register column"
                                value={inputState.calle}
                                onChange={onInputChange}
                            />
                            <div className="register-columns_container">
                                <div className="register-columnD">
                                    <InputGeneric
                                        placeholder="1568"
                                        label="Numero"
                                        type="number"
                                        width={widthInputColum}
                                        className="input-register column"
                                        name='numero'
                                        value={inputState.numero}
                                        onChange={onInputChange}
                                    />
                                    <InputGeneric
                                        placeholder="San Jose"
                                        label="Localidad"
                                        type="text"
                                        width={widthInputColum}
                                        className="input-register column"
                                        name='localidad'
                                        value={inputState.localidad}
                                        onChange={onInputChange}
                                    />
                                </div>
                                <div className="register-columnI">
                                    <InputGeneric
                                        placeholder="Guaymallen"
                                        label="Departamento"
                                        type="text"
                                        width={widthInputColum}
                                        className="input-register column"
                                        name='departamento'
                                        value={inputState.departamento}
                                        onChange={onInputChange}
                                    />
                                    <InputGeneric
                                        placeholder="4"
                                        label="Piso"
                                        type="number"
                                        width={widthInputColum}
                                        className="input-register column"
                                        name='piso'
                                        value={inputState.piso}
                                        onChange={onInputChange}
                                    />

                                </div>
                            </div>


                        </div>
                        <div className='containerbuttonsRegisterSecond'>
                            <div className='buttonRegister-register__divPrincipal'>
                                <button onClick={() => handleDomicilio()}>Guardar Domicilio</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}
