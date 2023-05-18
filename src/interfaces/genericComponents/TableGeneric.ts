// Definimos la interfaz para cada columna de la tabla
interface TableColumn {
  label: string; // Etiqueta de la columna
  key: string; // Clave que corresponde a la propiedad del objeto en los datos
  width?: string | number; // Ancho opcional de la columna
  render?: (item: any) => React.ReactNode; // Función opcional para personalizar la renderización del contenido de la celda // Función opcional para personalizar la renderización del contenido de la celda
}
// Definimos la interfaz para las propiedades de la tabla
export interface TableProps<T> {
  columns: TableColumn[]; // Definición de las columnas de la tabla
  nameTable?: string;
  urlFetch: string;
}
