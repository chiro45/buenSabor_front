import React, { useEffect, useState } from "react";
import "./CartOpciones.css"; // Archivo CSS para estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { IPedido } from "../../../../interfaces";

interface CartOpcionesProps {
    opciones: string[];
    iconos: IconDefinition[];
    propiedad: string;
}

const CartOpciones: React.FC<CartOpcionesProps> = ({ opciones, iconos, propiedad }) => {
    const [itemsPedido, setItemsPedido] = useLocalStorage<IPedido | {}>(`cart${propiedad}`, {});
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(!itemsPedido? itemsPedido : opciones[0]);
    console.log(opciones[0])
    console.log(!itemsPedido)
    const handleClick = (opcion: any) => {
        setOpcionSeleccionada(opcion);
    };
    useEffect(() => {
       
       setItemsPedido(opcionSeleccionada);
    }, [opcionSeleccionada])


    return (
        <div className="cart_opciones-container">
            {opciones.map((opcion, index) => (
                <button
                    key={opcion}
                    className={`opcion-btn ${opcionSeleccionada === opcion ? "activo" : ""}`}
                    onClick={() => handleClick(opcion)}
                >
                    <FontAwesomeIcon icon={iconos[index]} /> {opcion}
                </button>
            ))}
        </div>
    );
};

export default CartOpciones;
