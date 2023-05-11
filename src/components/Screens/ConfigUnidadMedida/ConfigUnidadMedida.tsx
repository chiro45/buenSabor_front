import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"

import { ABMComponent } from "../../ui/ABMComponent/ABMComponent";
import axios from "axios";
import { useEffect, useState } from "react";




interface UnidadMedida {
    id: number;
    tipo: string;
}



export const ConfigUnidadMedida = () => {

    const columnsArtInsumo = [
        { label: 'Tipo', key: 'tipo' },
        { label: "Acciones", key: "acciones" }

    ];

    const dataArtInsumo: UnidadMedida[] = [

        {
            id: 1,
            tipo: 'ml',
        },
        {
            id: 2,
            tipo: 'lt',
        },
        {
            id: 3,
            tipo: 'gr',
        },
        {
            id: 4,
            tipo: 'cm³',
        },
        {
            id: 5,
            tipo: 'KG',
        }

    ];

    const [dataTable, setDataTable] = useState([])

    const getData = () => {
        axios.get(' http://localhost:9000/unidadmedidas')
            .then((response) => { setDataTable(response.data) })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = (obj: any) => {
        const { tipo } = obj.inputsValues
        axios.post(' http://localhost:9000/unidadmedidas', {
            tipo
        })
            .then((response) => { getData() })
            .catch((error) => console.error(error))
    }

    const handleDelete = (id: number) => {

        axios.delete(` http://localhost:9000/unidadmedidas/${id}`)
            .then((response) => { getData() })
            .catch((error) => console.error(error))
    }
    const handleUpdate = (id: number) => {
        axios.put(` http://localhost:9000/unidadmedidas/${id}`, {

        })
            .then((response) => { getData() })
            .catch((error) => console.error(error))
    }
    const handleGetId = (id: number) => {
        axios.get(` http://localhost:9000/unidadmedidas/${id}`)
            .then((response) => response)
            .catch((error) => console.error(error))
    }
    const arrElements = [
        {
            type: "input",
            label: "Nombre de la Unidad de medida",
            name: "tipo",
            placeholder: "Nombre Unidad",

        }
    ]

    const [openModal, setOpenModal] = useState(false)
    const [unidadActual, setUnidadActual] = useState({})
    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"Unidad Medida"} placeholder={"Ingrese su categoria"} />

            {
                openModal ==false
                ? <button onClick={() => { setOpenModal(true)}}> Agregar Unidad Medida</button> 
                : <ABMComponent
                arrElement={arrElements}
                title="Unidad Medida"
                handleSubmit={handleSubmit}
                closeModal={setOpenModal}
                 />

                
            }
            
            {/* <div>
                <button>Agregar Categoria</button>
            </div> */}

            <GenericTable<UnidadMedida>
                columns={columnsArtInsumo}
                data={dataTable}
                deleted={handleDelete}
                update={handleUpdate}
                get={handleGetId}
            />

        </div>
    )
}
