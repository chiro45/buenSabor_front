import { useAuth0 } from '@auth0/auth0-react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { fetchDeleteById, getElementSetState } from '../../../helpers'
import { IUsuario } from '../../../interfaces'

const urlUsuario = `${import.meta.env.VITE_URL_USUARIO}`
const TableEmployed = () => {

    const {getAccessTokenSilently} = useAuth0()
    const [employed, setEmployed] = useState<IUsuario[]>([]);
    const columns = [
        { label: 'Nombre y Apellido', key: 'usuario' },
        { label: 'Puesto', key: 'rol' },
        { label: 'Dar de baja', key: 'acciones' }
    ]
    const fetchData = async() =>{
        const token = await getAccessTokenSilently();
        const headers = {
          'Authorization': `Bearer ${token}`
        };
        getElementSetState(urlUsuario, headers, setEmployed);
    }
    useEffect(() => {
        fetchData();
    }, [ ])

    const handleDelete = async (usuario:IUsuario) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: `¿Seguro que quieres eliminar a ${usuario.usuario}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = await getAccessTokenSilently();
                const headers = {
                  'Authorization': `Bearer ${token}`
                };
                fetchDeleteById(`${urlUsuario}/${usuario.id}`, headers)
                    .then((response) => {
                        Swal.fire(
                            'Eliminado',
                            `${usuario.usuario} eliminado`,
                            'success'
                        )
                    }).then()
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
    return (
        <div className="containerTablegeneric">
            <table className="tabla tbl-st6">
                <thead className="theadTableGeneric">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="tbodyTableGeneric">
                    {employed !== undefined &&
                        employed.map((item: any) => (
                            (item.rol !== 'CLIENTE' && item.rol !== 'ADMIN') && (
                                <tr className="trTable" key={item.id} style={{padding:'.4rem'}}>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            <div className="tdTableGeneric">
                                                {
                                                    column.key === "acciones" ?
                                                        <button onClick={() => handleDelete(item)} className="divButtonTable deleteBtnTable">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button> :
                                                        item[column.key]
                                                }
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            )
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}

export default TableEmployed
