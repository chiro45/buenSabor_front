import { faPenToSquare, faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./BtsTable.css"
import { FunctionComponent } from "react"
import { useDispatch } from "react-redux"
import { addElementActiveTable, getDataTable } from '../../../Redux/Reducers/TableReducer/TableReducer';
import { handleModalsTable } from "../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import Swal from "sweetalert2"
import axios from 'axios';

interface IBtnsTable {
    element: any,
    nameTable?: string
    urlFetch: string
}
export const BtnsTable: FunctionComponent<IBtnsTable> = ({ element, nameTable, urlFetch }) => {
    const dispatch = useDispatch()
    const handleView = () => {
        dispatch(addElementActiveTable(element))
        dispatch(handleModalsTable("modalview"))
    }
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: `¿Seguro que quieres eliminar?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${urlFetch}/${element.id}`)
                    .then((response) => { dispatch(getDataTable(urlFetch)) })
                    .catch((error) => console.error(error))
                Swal.fire(
                    'Deleted!',
                    'Eliminado',
                    'success'
                )
            }
        })
    }
    const handleEdit = () => {
        dispatch(addElementActiveTable(element))
        dispatch(handleModalsTable(`${nameTable}`))
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
