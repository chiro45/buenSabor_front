import { faPenToSquare, faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./BtsTable.css"
import { FunctionComponent } from "react"

interface IBtnsTable {
    functionEdit?: () => {}
    functionView?: () => {}
    functionDelete?: () => {}
    element?: {}

}
export const BtnsTable: FunctionComponent<IBtnsTable> = ({ functionDelete, functionEdit, functionView, element }) => {

    const handleView = () => {
        //functionView()
    }

    const handleDelete = () => {
        //functionDelete()
    }

    const handleEdit = () => {
        //functionEdit()
    }

    return (
        <div className="containersaso">
            <div className="containerBtnsTablePrincipal ">
                <button onClick={handleEdit} className="divButtonTable editBtnTable">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={handleView} className="divButtonTable viewBtnTable">
                    <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={handleDelete} className="divButtonTable deleteBtnTable">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}
