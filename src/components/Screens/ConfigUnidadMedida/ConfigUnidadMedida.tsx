import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import { useEffect, useState } from "react";
import { ModalUnidadMedida } from "../../ui/Modals/ModalUnidadMedida/ModalUnidadMedida";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer";
import { ModalViewElements } from "../../ui/Modals/ModalViewElements/ModalViewElements";





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

    const dispatch = useDispatch()

    // Utilizamos useEffect para actualizar los datos de la tabla en el estado global cuando cambia la propiedad "data"
    useEffect(() => {
        dispatch(addDataTable(dataArtInsumo))
    }, [])

    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"Unidad Medida"} placeholder={"Ingrese su categoria"} />
            <ModalUnidadMedida />
            <ModalViewElements/>
            <GenericTable<UnidadMedida> columns={columnsArtInsumo} nameTable="modalMedidas" />

        </div>
    )
}



/*

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


*/