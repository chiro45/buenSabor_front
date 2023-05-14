import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { removeElementActiveTable } from "../../../../Redux/Reducers/TableReducer/TableReducer"
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { LayoutModal } from "../ModalTables/LayoutModal/LayoutModal"


export const ModalViewElements = () => {

  const openModal = useSelector((state: any) => state.ModalsReducer.modalview)

  const elemetActive = useSelector((state: any) => state.TableReducer.elementActive)

  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(handleModalsTable("modalview"))
    dispatch(removeElementActiveTable())
  }
  console.log(elemetActive)
  return (
    <div>
      {
        openModal === true
          ? <LayoutModal>
            <div>

              <button onClick={() => { handleCloseModal() }}>Cerrar</button>
            </div>
          </LayoutModal>
          : null
      }
    </div>
  )
}
