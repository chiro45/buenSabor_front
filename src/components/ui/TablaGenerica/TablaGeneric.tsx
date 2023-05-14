import { BtnsTable } from "../Buttons/BtnsTable";
import "./TablaGeneric.css"

import { useSelector } from "react-redux";


// Definimos la interfaz para cada columna de la tabla
interface TableColumn {
  label: string; // Etiqueta de la columna
  key: string; // Clave que corresponde a la propiedad del objeto en los datos
  width?: string | number; // Ancho opcional de la columna
  render?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda
  isTrueOrFalse?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda
}

// Definimos la interfaz para las propiedades de la tabla
interface TableProps<T> {
  columns: TableColumn[]; // Definición de las columnas de la tabla
  nameTable?: string
  urlFetch: string
}

// Creamos el componente para la tabla genérica
export const GenericTable = <T extends { id: any }>({ columns, nameTable, urlFetch }: TableProps<T>) => {
  // Obtenemos los datos de la tabla del estado global con useSelector
  const dataTable = useSelector((state: any) => state.TableReducer)
  return (
    // Renderizamos la tabla
    <div className="containerTablegeneric">
      <table className="GenericTableContainer">
        <thead className="theadTableGeneric">
          <tr>
            {/* Iteramos sobre las columnas para renderizar los encabezados */}
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tbodyTableGeneric">
          {/*Iteramos sobre los datos para renderizar las filas */}
          {
            // Validamos que haya datos en la tabla
            dataTable.data !== undefined &&
            dataTable.data.map((item: any) => (
              <tr key={item.id}>
                {/* Iteramos sobre las columnas para renderizar las celdas */}
                {columns.map((column) => (
                  <td key={column.key}>
                    {/* Validamos si se especificó una función para personalizar la renderización del contenido de la celda */}
                    <div className="tdTableGeneric">
                      {
                        column.render // Si existe la función "render" se ejecuta
                          ? column.render(item[column.key])
                          : column.isTrueOrFalse // Si existe la función "isTrueOrFalse" y el contenido de la celda es booleano, se ejecuta
                            ? column.isTrueOrFalse(item[column.key])
                            : column.label === "Acciones" // Si el label de la columna es "Acciones" se renderizan los botones de acción
                              ? <BtnsTable
                                element={item}
                                nameTable={nameTable}
                                urlFetch={urlFetch} />
                              : item[column.key] // Si no hay una función personalizada, se renderiza el contenido de la celda tal cual
                      }
                    </div>
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  );
};