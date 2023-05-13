import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { removeElementActiveTable } from "../../../../Redux/Reducers/TableReducer/TableReducer"
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer"


export const ModalViewElements = () => {

  const openModal = useSelector((state: any) => state.ModalsReducer.modalview)

  const elemetActive = useSelector((state: any) => state.TableReducer.elementActive)

  const dispatch = useDispatch()
  const handleCloseModal = () => {
    dispatch(handleModalsTable("modalview"))
    dispatch(removeElementActiveTable())
  }
  return (
    <div>
      {

        openModal === true
          ? <div>

            {Object.entries(elemetActive).map(([key, value]: any) => (
              <p key={key}> {key}: {value}</p>
            ))}
            <button onClick={() => { handleCloseModal() }}>Cerrar</button>
          </div>
          : null
      }
    </div>
  )
}
