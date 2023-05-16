import { CategoryIcon } from "./CategoryIcon"
import "./CategoryList.css"
import { faHamburger, faWineBottle, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import papas from "../../assets/papas.svg"
export const CategoryList = () => {
  return (
    <div className="category_list">
      <CategoryIcon  categoryName="Burgers"  icon={faHamburger} />
      <CategoryIcon categoryName="Papas" icon={papas} color={"#FFCC33"}/>
      
      <CategoryIcon categoryName="Pizza" icon={faPizzaSlice} color={"#FF7701"}/>
    </div>
  )
}
