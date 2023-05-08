import { InputGeneric } from "../../../ui/InputGeneric/InputGeneric"
import logo from "../../../../assets/logopng.webp"
import "./RegisterSecond.css"
// import { NavBarMobile } from "../../../ui/NavBarMobile/NavBarMobile"

export const RegisterSecond = () => {
    const widthInputColum = "100%"
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
                                className="input-register column"
                            />
                            <div className="register-columns_container">
                                <div className="register-columnD">
                                    <InputGeneric
                                        placeholder="1568"
                                        label="Numero"
                                        type="number"
                                        width={widthInputColum}
                                        className="input-register column"
                                    />
                                    <InputGeneric
                                        placeholder="San Jose"
                                        label="Localidad"
                                        type="text"
                                        width={widthInputColum}
                                        className="input-register column"
                                    />
                                </div>
                                <div className="register-columnI">
                                    <InputGeneric
                                        placeholder="Guaymallen"
                                        label="Departamento"
                                        type="text"
                                        width={widthInputColum}
                                        className="input-register column"
                                    />
                                    <InputGeneric
                                        placeholder="C4"
                                        label="Piso"
                                        type="text"
                                        width={widthInputColum}
                                        className="input-register column"
                                    />

                                </div>
                            </div>


                        </div>
                        <div className='containerbuttonsRegisterSecond'>
                            <div className='buttonRegister-register__divPrincipal'>
                                <button onClick={() => { console.log("register") }}>Guardar Domicilio</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>

    )
}
