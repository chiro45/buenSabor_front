import { faCartPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./HeaderStore.css"
export const HeaderStore = () => {
  return (
    <div className="containerHeaderPage__storePage">
      <div className="containerImgLogo__storePage">
        <img src="/src/assets/logopng.webp" />
      </div>
      <div className="containerInputStore__storePage">
        <input className="InputStore__storePage" type="text" placeholder="Busca un producto" />
      </div>
      <div className="containerActionsStore__storePage">
        <button className="buttonActionStoreButton__storePage">
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button className="buttonActionStoreButton__storePage">
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </div>
  )
}
