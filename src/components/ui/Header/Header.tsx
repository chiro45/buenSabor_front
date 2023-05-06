
import "./Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faUser } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
  return (
    <div className="header-container">
     <div className="header-container-subcaja">
      <button className="header-button">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <img src="/src/assets/logopng.webp" alt="Logo" className="header-logo" />
      <button className="header-button">
        <FontAwesomeIcon icon={faUser} />
      </button></div>
    </div>
  );
}
