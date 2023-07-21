import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Swal from "sweetalert2";
import { alertConfirm } from "../../../functions/alerts";
import { removeDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer"
import "./Subheader.css"

interface SubheaderProps {
  routes?: { route: string; text: string; icon: string }[];
}

export const Subheader = ({ routes }: SubheaderProps) => {
  const adminRoutes = [
    { route: "/config/articuloInsumo", text: "Articulos / Insumos", icon: "" },
    { route: "/config/category", text: "Categoria", icon: "" },
    { route: "/config/unidadMedida", text: "Unidad Medida", icon: "" },
    { route: "/config/articuloManufacturado", text: "Articulos Manufacturado", icon: "" },
    { route: "/config/employedRegister", text: "Gestion Empleados", icon: "" },
  ];

  const renderedRoutes = routes || adminRoutes;

  const dispatch = useDispatch()
  const location = useLocation()
  const { pathname } = location
  return (
    <div className="containerSubheader">
      {
        renderedRoutes.map(el => (
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
