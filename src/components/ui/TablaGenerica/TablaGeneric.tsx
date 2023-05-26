import { useSelector } from "react-redux";
import { BtnsTable } from "../Buttons/ButtonsTable/BtnsTable";
import { ITableProps } from "../../../interfaces/genericComponents/ITableGeneric";
import "./TablaGeneric.css"



// Creamos el componente para la tabla genérica
export const GenericTable = <T extends { id: any }>({ columns, nameTable, urlFetch }: ITableProps<T>) => {
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