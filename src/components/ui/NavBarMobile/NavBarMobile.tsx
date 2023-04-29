
import "./NavBarMobile.css"
export const NavBarMobile = () => {

  return (
    <div className="navBarMobile__containerPrincipal">
      <div className="navBarMobile__contaierItems">
        {
          [{
            text: "Home", icon: "fas fa-house", active: false
          }, {
            text: "Store", icon: "fas fa-shop", active: true
          }, {
            text: "Ordenes", icon: "fas fa-list-ol", active: false
          }, {
            text: "cart", icon: "fas fa-cart-shopping", active: false
          }].map(({text, icon,active}) => (
            <div className={active ? "navBarCarItemActive" :"navBarCarItem"}>
              <div>
                <i className={`${icon}`}></i>
              </div>
              <div>
                <p>{text}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
