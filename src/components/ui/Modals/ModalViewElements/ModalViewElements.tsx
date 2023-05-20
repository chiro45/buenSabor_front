import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeElementActiveTable } from "../../../../Redux/Reducers/TableReducer/TableReducer"
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { LayoutModal } from "../ModalTables/LayoutModal/LayoutModal"
import { IColumnsCategoria, IColumnsInsumo, IColumnsUnidadMedida } from "../../../../interfaces/columnsEntidades"
import { IProps } from "../../../../interfaces/IPropsModalViewElemnts"


export const ModalViewElements = () => {


  const openModal = useSelector((state: any) => state.ModalsReducer.modalView)

  const elementActive: IProps = useSelector((state: any) => state.TableReducer.elementActive)
  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(handleModalsTable("modalView"))
    dispatch(removeElementActiveTable())
  }

  const [actualProp, setActualProp] = useState<any>([])
  useEffect(() => {
    if (elementActive !== null) {
      switch (elementActive.tipoClase) {
        case "UnidadMedida":
          setActualProp(IColumnsUnidadMedida);
          break;
        case "ArticuloInsumo":
          setActualProp(IColumnsInsumo);
          break;
        case "Categoria":
          setActualProp(IColumnsCategoria);
          break;
        default:
          break;
      }
    }
  }, [elementActive, setActualProp])


  const getObjectProperties = () => {
    return actualProp.map((column: any) => {
      const { label, key, render } = column;
      const value = elementActive[key];

      return (
        <li key={key}>
          <strong>{label}: </strong>
          {render ? render(value) : value}
        </li>
      );
    });
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
