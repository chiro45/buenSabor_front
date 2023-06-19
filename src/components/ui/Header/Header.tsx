
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartPlus, faUser } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
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
      </div>
    </div>
  );
}
