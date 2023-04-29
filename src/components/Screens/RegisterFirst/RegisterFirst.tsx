import { InputGeneric } from "../../ui/InputGeneric/InputGeneric"
import logo from "../../../assets/logopng.webp"
import "./RegisterFirst.css"
import { NavBarMobile } from "../../ui/NavBarMobile/NavBarMobile"

export const RegisterFirst = () => {
    return (
        <>
            <div className="register">
                <div className="register_image-container">
                    <img src={logo} className="register_logo" />
                    <h1>Ven rapido y sabroso</h1>
                    <p>Empieza a disfrutar de nuestros servicios</p>
                </div>
                <div className="register_container">
                    <div className="register-info_container">
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
                    <div className="register-btn_container">
                        {/* <button className="google-signup-button">
                            <span className="google-icon"><i className="fa fa-google"></i></span>
                            Registrarse con Google
                        </button> */}
                        <button className="btn_register">Registrarse con google</button>
                        <button className="btn_register">Registrarse</button>
                    </div>
                </div>
                <NavBarMobile/>
            </div>

        </>

    )
}
