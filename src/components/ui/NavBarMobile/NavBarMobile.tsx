import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShop, faList, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./NavBarMobile.css"
import { useLocation, useNavigate } from 'react-router-dom';


export const NavBarMobile = () => {


  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate();
  return (
    <div className="containerPrincipalNavBarMobile mobile">
      <div className="navBarMobile__containerPrincipal">
        <div className="navBarMobile__contaierItems">
          {
            [{
              text: "Home", icon: faHome, route: "/"
            }, {
              text: "Store", icon: faShop, route: "/store"
            }, {
              text: "Ordenes", icon: faList, route: "/order"
            }, {
              text: "cart", icon: faShoppingCart, route: "/cart"
            }].map(({ text, icon, route }) => (
              <div key={text}
                onClick={() => navigate(route)}
                className={pathname === route ? "navBarCarItemActive" : "navBarCarItem"}>
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
