import { CategoryIcon } from "./CategoryIcon"
import { faHamburger, faPizzaSlice, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import "./CategoryList.css"
import papas from "../../../assets/papas.svg"

export const CategoryList = () => {
  return (
    <div className="containerCategoriList">
      <div className="category_list">
        <CategoryIcon
          categoryName="Papas"
          icon={papas}
          color={"var(--principal)"} />
        <CategoryIcon
          categoryName="Hamburguesas"
          icon={faHamburger}
          color={"var(--principal)"} />
        <CategoryIcon
          categoryName="Pizzas"
          icon={faPizzaSlice}
          color={"var(--principal)"} />
        <CategoryIcon
          categoryName="Bebidas"
          icon={faWineBottle}
          color={"var(--principal)"} />
      </div>
    </div>
  )
}
