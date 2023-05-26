import { Header } from "../../ui/Header/Header"
import { SearchGeneric } from "../../ui/SearchGeneric/SearchGeneric"
import { Subheader } from "../../ui/Subheader/Subheader"
import { GenericTable } from "../../ui/TablaGenerica/TablaGeneric"
import styles from "./ConfigArtiruloManufacturado.module.css"
import { ModalArticuloManufacturado } from "../../ui/Modals/ModalTables/ModalArticuloManufacturado/ModalArticuloManufacturado"
import { IColumnsArticuloManufacturado } from "../../../interfaces/columnsEntidades"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getDataTable } from "../../../Redux/Reducers/TableReducer/TableReducer"

const urlARticulosManufacturados = `${import.meta.env.VITE_URL_API}/articulos_manufacturado`

export const ConfigArtiruloManufacturado = () => {

 // Define las columnas de la tabla como un array de objetos con label y key
 const btnColumnsArticuloManufacturado = [
    ...IColumnsArticuloManufacturado,
    { label: "Acciones", key: "acciones" }
];
   
       // Obtiene la función dispatch del store
       const dispatch = useDispatch();

       // Ejecuta la acción para obtener los datos de la tabla al cargar el componente
       useEffect(() => {
           dispatch(getDataTable(urlARticulosManufacturados));
       }, [dispatch]);
    


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
                urlFetch={urlARticulosManufacturados}
                nameTable={"modalArticuloManufacturado"}
            />

        </div>
    )
}
