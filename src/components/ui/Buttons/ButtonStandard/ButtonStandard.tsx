import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import "./ButtonStandard.css"
import { IButtonStandard } from './IButtonStandard'

/**
 * Componente de botón estándar.
 * 
 * Propiedades:
 * - backgroundColor: Color de fondo del botón.
 * - colorText: Color del texto del botón.
 * - fontSize: Tamaño de fuente del texto del botón.
 * - width: Ancho del botón.
 * - height: Altura del botón.
 * - text: Texto a mostrar en el botón.
 * - icon: Icono a mostrar en el botón.
 * - handleClick: Función para manejar el evento de clic en el botón.
 */

export const ButtonStandard: FC<IButtonStandard> = ({
    backgroundColor,
    colorText,
    fontSize,
    width,
    height,
    text,
    icon,
    handleClick
}) => {
    const style = {
        backgroundColor,
        color: colorText,
        fontSize,
        width,
        height
    };
    return (
        <button
            onClick={() => {
                handleClick()
            }}
            className='buttonStandard'
            style={style}
        >
            {/* Renderizar el texto si está presente */}
            {text && <p>{text}</p>}

            {/* Renderizar el icono si está presente */}
            {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    )
}
