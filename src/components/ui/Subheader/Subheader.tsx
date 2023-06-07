import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { removeDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer"
import "./Subheader.css"


export const Subheader = () => {

  const routes = [
    { route: "/config/articuloInsumo", text: "Articulos / Insumos", icon: "" },
    { route: "/config/category", text: "Categoria", icon: "" },
    { route: "/config/unidadMedida", text: "Unidad Medida", icon: "" },
    { route: "/config/articuloManufacturado", text: "Articulos Manufacturado", icon: "" },
  ]
  const dispatch = useDispatch()
  const location = useLocation()
  const { pathname } = location
  return (
    <div className="containerSubheader">
      {
        routes.map(el => (
          <Link
            key={el.route}
            className={
              pathname === el.route
                ? `linksSubheader active`
                : "linksSubheader"}
            onClick={() => {
              dispatch(removeDataTable())
            }}
            to={`${el.route}`}>
            {el.text}{el.icon}
          </Link>
        ))
      }

    </div>
  )
}
