import { InputGeneric } from "../../../ui/InputGeneric/InputGeneric"
import logo from "../../../../assets/logopng.webp"
import "./RegisterFirst.css"

export const RegisterFirst = () => {
    return (
        <>
            <div className="containerPrincipalRegister">
                <div className="containerRegister">
                    <div className="register_image-container">
                        <img src={logo} className="register_logo" />
                        <h1>Ven rapido y sabroso</h1>
                        <p>Empieza a disfrutar de nuestros servicios</p>
                    </div>
                    <div className="register-info_container">
                        <div className="register-inputs_container">
                            <InputGeneric
                                placeholder="Nombre usuario"
                                label="Usuario"
                                className="input-register"
                            />
                            <InputGeneric
                                placeholder="Email@gmail.com"
                                label="Email"
                                type="email"
                                className="input-register"
                            />
                            <InputGeneric
                                placeholder="Contraseña"
                                label="Contraseña"
                                type="password"
                                className="input-register"
                            />
                            <InputGeneric
                                placeholder="Repita contraseña"
                                label="Repita contraseña"
                                type="password"
                                className="input-register"
                            />
                        </div>
                        <div className='containerbuttonsRegister'>
                            <div className='buttonRegister-register__divPrincipal'>
                                <button onClick={() => { console.log("register") }}>Registrarse</button>
                            </div>
                            <div className="containerButton__login">

                                <div className="google-btn_register">
                                    <div className="google-icon-wrapper_register">
                                        <img className="google-icon_register"
                                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                    </div>
                                    <div className="containerTextGoogle_register">
                                        <p className="btn-text"><b>Registrarse con Google</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}
