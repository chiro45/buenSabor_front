import { faArrowRightArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './FiltroStore.css'
export const FiltrosStore = () => {
    return (
        <div className="containerPrincipal__FiltroStore">
            <div className="containerActions__FiltroStore">
                <button className="">
                    <FontAwesomeIcon style={{ rotate: "90deg", marginLeft: "-.3rem" }} icon={faArrowRightArrowLeft} /><p>Ordenar</p>
                </button>
            </div>
            <div style={{ borderLeft: "1px solid #ccc" }} className="containerActions__FiltroStore">
                <button >
                    <FontAwesomeIcon icon={faBars} /><p>Filtrar</p>
                </button>
            </div>
        </div>
    )
}
