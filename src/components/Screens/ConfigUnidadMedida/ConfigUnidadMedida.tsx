import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"



export interface UnidadMedida {
    id: number;
    tipo: string;
}
export interface Producto {

}
export interface Categoria {

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

    return (
        <div>
            <Header />
            <div style={{ height: "5vh", backgroundColor: "#fea" }}>
                Subheader
            </div>
            <SearchGeneric label={"categoria"} placeholder={"Ingrese su categoria"} />
            <div>
                <button>Agregar Categoria</button>
            </div>

            <GenericTable<UnidadMedida> columns={columnsArtInsumo} data={dataArtInsumo} />

        </div>
    )
}
