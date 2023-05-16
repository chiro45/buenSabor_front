import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { removeElementActiveTable } from "../../../../Redux/Reducers/TableReducer/TableReducer"
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { LayoutModal } from "../ModalTables/LayoutModal/LayoutModal"
import { UnidadMedida } from "../../../Screens/ConfigArticuloInsumo/ConfigArticuloInsumo"
import { ArticuloInsumo, ArticuloManufacturado, Producto } from "../../../../interfaces/entidades"


interface Props {
  object: UnidadMedida | ArticuloInsumo | Producto | ArticuloManufacturado;
}

export const ModalViewElements = () => {

  const openModal = useSelector((state: any) => state.ModalsReducer.modalview)

  const elemetActive: Props = useSelector((state: any) => state.TableReducer.elementActive)

  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(handleModalsTable("modalview"))
    dispatch(removeElementActiveTable())
  }

  const getObjectProperties = () => {
    return Object.entries(elemetActive).map(([key, value]) => (
      <li key={key}>
        <strong>{key}: </strong>
        {value}
      </li>
    ));
  };
  return (
    <div>
      {
        openModal === true
          ? <LayoutModal>
            <div>
              <div>
                <ul>
                  {getObjectProperties()}
                </ul>
              </div>
              <button onClick={() => { handleCloseModal() }}>Cerrar</button>
            </div>
          </LayoutModal>
          : null
      }
    </div>
  )
}
