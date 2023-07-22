import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertError, alertSuccess } from "../../../../functions/alerts";
import { updateElement } from "../../../../helpers";
import { useAccessToken, useInput } from "../../../../hooks";
import { ICliente } from "../../../../interfaces";
import { ButtonStandard } from "../../Buttons";
import { InputGeneric } from "../../InputGeneric";
import { LayoutModal } from "../ModalTables";
import './ModalProfile.css'

const urlCliente = `${import.meta.env.VITE_URL_CLIENTE}`
const ModalProfile = ({ cliente, cargarCliente }: { cliente: ICliente, cargarCliente:any }) => {
    const headers = useAccessToken();
    const [openModal, setOpenModal] = useState(false)

    const [inputState, onInputChange, setInputState]: any = useInput({});

    useEffect(() => {
        if (openModal) {
            const { nombre, apellido, telefono, email } = cliente;
            setInputState({
                nombre: nombre || "",
                apellido: apellido || "",
                telefono: telefono || "",
                email: email || "",
            });
        } else {

        }
    }, [openModal]);

    const handleSubmitModal = () => {
     
        const data = {
            nombre: inputState.nombre,
            apellido: inputState.apellido,
            telefono: inputState.telefono,
            email: inputState.email,
        };
        updateElement(urlCliente, cliente.id, {...cliente,...data}, headers)
          .then(() => {
            alertSuccess('','Cliente actualizado correctamente')
          }).then(()=>setOpenModal(false)).then(()=>cargarCliente())
          .catch((error) => alertError(error,'Error al actualizar'));
    };

    return (
        <>
            {openModal ? (<div className="modalProfile">
                <LayoutModal>
                    <div className="profileForm">
                        <h1>Editar Perfil</h1>
                        <div className="profileInfo">
                            <InputGeneric
                                className="inputProfile"
                                label="Nombre"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={inputState.nombre}
                                onChange={onInputChange}
                                width={'100'}
                            />
                            <InputGeneric
                                className="inputProfile"
                                label="Apellido"
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                value={inputState.apellido}
                                onChange={onInputChange}
                                width={'100'}
                            />
                            <InputGeneric
                                className="inputProfile"
                                type="number"
                                name="telefono"
                                label="Telefono"
                                placeholder="23165948"
                                value={inputState.telefono}
                                onChange={onInputChange}
                                width={'100'}
                            />
                            <InputGeneric
                                label="Email"
                                className="inputProfile not-allowed"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={inputState.email}
                                readOnly={true}
                                width={'100'}
                            />
                        </div>

                        <div className="profileButtons">
                            <ButtonStandard
                                text="Guardar"
                                handleClick={handleSubmitModal}
                                width="20vw"
                                height="4vh"
                                backgroundColor="#0080FF"
                                colorText="#fff"
                                fontSize="2vw"
                            />
                            <ButtonStandard
                                text="Cancelar"
                                handleClick={() => setOpenModal(false)}
                                width="20vw"
                                fontSize="2vw"
                                height="4vh"
                                backgroundColor="#f00"
                                colorText="#fff"
                            />
                        </div>
                    </div>
                </LayoutModal>
            </div>)
                : <button className='profile_btn' onClick={() => setOpenModal(true)}>Modificar</button>}
        </ >


    );
};

export default ModalProfile;
