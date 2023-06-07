import { FunctionComponent } from "react"
import { useDispatch } from "react-redux"
import axios from 'axios';
import { addElementActiveTable, getDataTable } from '../../../../Redux/Reducers/TableReducer/TableReducer';
import { handleModalsTable } from "../../../../Redux/Reducers/ModalsReducer/ModalsReducer"
import { IBtnsTable } from "../../../../interfaces/IBtnsTable";
import { faPenToSquare, faTrash, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Swal from "sweetalert2"
import "./BtsTable.css"
import { useAccessToken } from "../../../../hooks";

export const BtnsTable: FunctionComponent<IBtnsTable> = ({ element, nameTable, urlFetch }) => {

    const headers = useAccessToken();

    const dispatch = useDispatch()
    const handleView = () => {
        dispatch(addElementActiveTable(element))
        dispatch(handleModalsTable("modalView"))
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
                    .then((response) => {
                        dispatch(getDataTable(urlFetch, headers))
                        Swal.fire(
                            'Deleted!',
                            'Eliminado',
                            'success'
                        )
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            `${error.response.data}`,
                            'error')
                        console.error(error)
                    })

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
