import { TypesTableGeneric } from '../../Types/TypesTableGeneric';
import { fetchGet } from '../../../helpers';

// Definimos la interfaz para el estado de la tabla
interface TableState {
  elementActive: any;
  data: any[];
}

// Definimos la interfaz para las acciones que se pueden realizar sobre el estado
interface TableAction {
  type: string;
  payload?: any;
}

// Definimos el estado inicial de la tabla
const initialState: TableState = {
  elementActive: null,
  data: []
};

// Creamos el reducer que maneja el estado de la tabla
export const TableReducer = (state: TableState = initialState, action: TableAction): TableState => {
  switch (action.type) {
    // Agregamos los datos a la tabla
    case TypesTableGeneric.addData:
      return {
        ...state,
        data: action.payload
      };
    // Removemos todos los datos de la tabla
    case TypesTableGeneric.removeData:
      return {
        elementActive: null,
        data: []
      };
    // Agregamos un elemento activo a la tabla
    case TypesTableGeneric.addElementActive:
      return {
        ...state,
        elementActive: action.payload
      };
    // Removemos el elemento activo de la tabla
    case TypesTableGeneric.removeElementActive:
      return {
        ...state,
        elementActive: null
      };
    // En caso de que no se realice ninguna acción, devolvemos el estado actual
    default:
      return state;
  }
};

// Función asincrónica que hace una solicitud GET a la URL especificada y actualiza el estado de la tabla
export const getDataTable = (url: string, headers:Record<string, string>): any => {
  return async (dispatch: any): Promise<void> => {
    try {
      const respuesta = await fetchGet(url,headers);
      // Cuando se recibe la respuesta, se llama a la función addDataTable para agregar los datos a la tabla
      dispatch(addDataTable(respuesta));
    } catch (error) {
      console.error(error);
    }
  };
};

// Función que crea una acción para agregar datos a la tabla
const addDataTable = (data: {}): TableAction => ({
  type: TypesTableGeneric.addData,
  payload: data
});

// Función que crea una acción para agregar un elemento activo a la tabla
export const addElementActiveTable = (data: {}): TableAction => ({
  type: TypesTableGeneric.addElementActive,
  payload: data
});

// Función que crea una acción para remover todos los datos de la tabla
export const removeDataTable = (): TableAction => ({
  type: TypesTableGeneric.removeData
});

// Función que crea una acción para remover el elemento activo de la tabla
export const removeElementActiveTable = (): TableAction => ({
  type: TypesTableGeneric.removeElementActive
});
