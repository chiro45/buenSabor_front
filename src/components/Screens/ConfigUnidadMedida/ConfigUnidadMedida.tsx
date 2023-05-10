import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"

import { ABMComponent } from "../../ui/ABMComponent/ABMComponent";
import axios from "axios";




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

    const handleSubmit = (obj: any) => {
        const { tipo } = obj.inputsValues

        axios.post('/user', {
            tipo
        })
            .then((response) => console.log(response))
            .catch((error) => console.error(error))
    }

    const arrElements = [
        {
            type: "input",
            label: "Nombre de la Unidad de medida",
            name: "tipo",
            placeholder: "Nombre Unidad"
        }
    ]

    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"Unidad Medida"} placeholder={"Ingrese su categoria"} />

            <ABMComponent arrElement={arrElements} title="Unidad Medida" handleSubmit={handleSubmit} />

            <div>
                <button>Agregar Categoria</button>
            </div>

            <GenericTable<UnidadMedida> columns={columnsArtInsumo} data={dataArtInsumo} />

        </div>
    )
}
