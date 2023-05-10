

import { BtnsTable } from "../Buttons/BtnsTable";
import "./TablaGeneric.css"
interface TableColumn {
  label: string; // Etiqueta de la columna
  key: string; // Clave que corresponde a la propiedad del objeto en los datos
  width?: string | number; // Ancho opcional de la columna
  render?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda
  isTrueOrFalse?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda
}

interface TableProps<T> {
  columns: TableColumn[]; // Definición de las columnas de la tabla
  data: T[]; // Datos a mostrar en la tabla
}

export const GenericTable = <T extends { id: any }>({ columns, data }: TableProps<T>) => {
  const handledelete = ()=>{
    
  }
  const handleEdit = ()=>{

  }
  const handleView = ()=>{

  }
  return (
    <div className="containerTablegeneric">
      <table className="GenericTableContainer">
        <thead className="theadTableGeneric">
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tbodyTableGeneric">
          {data.map((item: any) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td  key={column.key}>
                  <div className="tdTableGeneric">
                    {
                      column.render// render existe ejecuta render
                        ? column.render(item[column.key])
                        : column.isTrueOrFalse//si existe si es booleano 
                          ? column.isTrueOrFalse(item[column.key])
                          : column.label === "Acciones" //si el label es acciones 
                            ? <BtnsTable />
                            : item[column.key]
                    }
                  </div>
                </td>
              ))}

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};





