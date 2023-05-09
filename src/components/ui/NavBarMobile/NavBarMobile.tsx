
import "./NavBarMobile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShop, faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const NavBarMobile = () => {
  return (
    <div className="containerPrincipalNavBarMobile">
      <div className="navBarMobile__containerPrincipal">
        <div className="navBarMobile__contaierItems">
          {
            [{
              text: "Home", icon: faHome, active: false
            }, {
              text: "Store", icon: faShop, active: true
            }, {
              text: "Ordenes", icon: faList, active: false
            }, {
              text: "cart", icon: faShoppingCart, active: false
            }].map(({ text, icon, active }) => (
              <div key={text} className={active ? "navBarCarItemActive" : "navBarCarItem"}>
                <div>
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div>
                  <p>{text}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
