import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import { Subheader } from "../../ui/Subheader/Subheader"
import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import styles from "./ConfigArtiruloManufacturado.module.css"
import { ModalArticuloManufacturado } from "../../ui/Modals/ModalTables/ModalArticuloManufacturado/ModalArticuloManufacturado"
import { IColumnsArticuloManufacturado } from "../../../interfaces/columnsEntidades"
export const ConfigArtiruloManufacturado = () => {

 // Define las columnas de la tabla como un array de objetos con label y key
 const btnColumnsArticuloManufacturado = [
    ...IColumnsArticuloManufacturado,
    { label: "Acciones", key: "acciones" }
];
   
    return (
        <div>
            <Header />

            {/* Subheader */}
            <Subheader />

            {/* Búsqueda genérica */}
            <SearchGeneric
                label={"categoria"}
                placeholder={"Ingrese su categoria"}
            />
            <ModalArticuloManufacturado/>
            
            {/* Tabla genérica */}
            <GenericTable<any>
                columns={btnColumnsArticuloManufacturado}
                urlFetch={''}
                nameTable={"modalArticuloManufacturado"}
            />

        </div>
    )
}
