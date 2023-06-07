import { useState } from 'react'
import { useInput } from '../../../hooks/useInput'
import { InputGeneric } from '../../ui/InputGeneric/InputGeneric'
import './Login.css'
import { Ilogin } from './ILogin'




export const Login: React.FC<Ilogin> = ({
    imageRol,
    urlPost
}) => {

    const [inputState, onInputChange] = useInput({
        email: "",
        passwd: ""
    })
    const { email, passwd } = inputState

    const handleLogin = () => {
        console.log(email, passwd)
    }

    const [showPass, setShowPass] = useState(false)
    return (
        <div className='containerPrincipalLogin'>
            <div className="principalContainerLogin">
                <div className='containerImgLogin'>
                    <img src={`${imageRol}`} />
                </div>
                <div className='containerTitleLogin'>
                    <h1>Bienvenido</h1>
                </div>
                <div className='containerInputsLogin'>
                    <InputGeneric
                        placeholder="Email@gmail.com"
                        label="Email"
                        type="email"
                        className="input-Login"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                    />
                    <InputGeneric
                        placeholder="Ingrese su contraseña"
                        label="Contraseña"
                        type={!showPass ? "password" : "text"}
                        className="input-Login"
                        name="passwd"
                        value={passwd}
                        onChange={onInputChange}
                    />
                    <div className='containerShowPass'>
                        <label>Mostrar contraseña</label>
                        <input type="checkbox" onChange={() => { setShowPass(!showPass) }} />
                    </div>

                </div>
                <div className='containerbuttonsLogin'>
                    <div className='buttonLoggin-ingresar__divPrincipal'>
                        <button onClick={handleLogin}>Ingresar</button>
                    </div>
                    <div className="containerButton__login">

                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                            </div>
                            <div className="containerTextGoolgle">
                                <p className="btn-text"><b>Ingresa con Goolge</b></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a>¿Olvido su contraseña?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
