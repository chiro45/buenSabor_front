import { TypesTableGeneric } from '../../Types/TypesTableGeneric';

interface TableState {
    elementActive: any;
    data: any[];
}

interface TableAction {
    type: string;
    payload?: any;
}

// Definimos el estado inicial
const initialState: TableState = {
    elementActive: null,
    data: []
}

// Creamos el reducer
export const TableReducer = (state: TableState = initialState, action: TableAction) => {
    switch (action.type) {
        case TypesTableGeneric.addData:
            return {
                ...state,
                data: action.payload
            }
        case TypesTableGeneric.removeData:
            return {
                elementActive: null,
                data: []
            }
        case TypesTableGeneric.addElementActive:
            return {
                ...state,
                elementActive: action.payload
            }
        case TypesTableGeneric.removeElementActive:
            return {
                ...state,
                elementActive: null
            }
        default:
            return state;
    }
}

export const addDataTable = (data: {}) => ({
    // Se define una acción "addDataTable" que recibe un objeto "data" como argumento
    type: TypesTableGeneric.addData, // Se especifica el tipo de acción que se está ejecutando
    payload: data // Se especifica el dato que se va a pasar como parámetro en la acción
})

export const addElementActiveTable = (data: {}) => ({
    // Se define una acción "addElementActiveTable" que recibe un objeto "data" como argumento
    type: TypesTableGeneric.addElementActive, // Se especifica el tipo de acción que se está ejecutando
    payload: data // Se especifica el dato que se va a pasar como parámetro en la acción
})

export const removeDataTable = () => ({
    // Se define una acción "removeDataTable" que no recibe argumentos
    type: TypesTableGeneric.removeData // Se especifica el tipo de acción que se está ejecutando
})

export const removeElementActiveTable = () => ({
    // Se define una acción "removeElementActiveTable" que no recibe argumentos
    type: TypesTableGeneric.removeElementActive // Se especifica el tipo de acción que se está ejecutando
})
