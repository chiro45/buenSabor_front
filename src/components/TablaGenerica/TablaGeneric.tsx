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
