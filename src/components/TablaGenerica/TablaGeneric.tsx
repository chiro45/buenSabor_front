import { BtnsTable } from "../ui/Buttons/BtnsTable";
import "./TablaGeneric.css";

interface Column {
  label: string;
  width?: string|number;
}

interface Props {
  columns: Column[];
  data: string[][];
}

export const TablaGeneric: React.FC<Props> = ({ columns, data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.label}
              </th>
              
            ))}
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              <td>
                <BtnsTable/>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};


// interface TableColumn {
//   label: string; // Etiqueta de la columna
//   key: string; // Clave que corresponde a la propiedad del objeto en los datos
//   width?: string | number; // Ancho opcional de la columna
//   render?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda
// }

// interface TableProps<T> {
//   columns: TableColumn[]; // Definición de las columnas de la tabla
//   data: T[]; // Datos a mostrar en la tabla
// }

// const GenericTable = <T extends { id: any }>({ columns, data }: TableProps<T>) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.key} style={{ width: column.width }}>
//               {column.label}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item:any) => (
//           <tr key={item.id}>
//             {columns.map((column) => (
//               <td key={column.key}>
//                 {column.render ? column.render(item[column.key]) : item[column.key]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default GenericTable;



// import GenericTable from './GenericTable';

// interface ArticuloInsumo {
//     id: number;
//     denominacion: string;
//     esInsumo: boolean;
//     precioCompra: number;
//     precioVenta: number;
//     stockActual: number;
//     stockMinimo: number;
//     unidadMedida: UnidadMedida,
// }

// export interface UnidadMedida {
//     id: number;
//     tipo: string;

// }
// export interface Producto {

// }
// export interface Categoria {

// }
// const ConfigCategory = () => {

//     const columnsArtInsumo = [
//         { label: 'Denominación', key: 'denominacion', width: '150px' },
//         { label: 'Es Insumo', key: 'esInsumo' },
//         { label: 'Precio Compra', key: 'precioCompra' },
//         { label: 'Precio Venta', key: 'precioVenta' },
//         { label: 'Stock Actual', key: 'stockActual' },
//         { label: 'Stock Mínimo', key: 'stockMinimo' },
//         { label: 'Unidad de Medida', key: 'unidadMedida', render: (unidadMedida: UnidadMedida) => unidadMedida.tipo },
//     ];

//     const dataArtInsumo: ArticuloInsumo[] = [
//         {
//           id: 1,
//           denominacion: 'denominacion_value2',
//           esInsumo: true,
//           precioCompra: 10.99,
//           precioVenta: 19.99,
//           stockActual: 100.0,
//           stockMinimo: 50.0,
//           unidadMedida: {
//             id: 1,
//             tipo: 'tipo_value',
//           }
//         },
//       ];

//     return (
//         <div>
//             <h1>Usuarios</h1>
//             <GenericTable<ArticuloInsumo> columns={columnsArtInsumo} data={dataArtInsumo} />
//         </div>
//     );
// };

// export default ConfigCategory;
