import { TypesModalTable } from "../../Types/TypesModalTable";



// Definimos el estado inicial
const initialState = {
    modalMedidas: false,
    modalview: false
}

// Creamos el reducer
export const ModalsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TypesModalTable.modalMedidas:
            return {
                ...state,
                modalMedidas: !state.modalMedidas
            }
        case TypesModalTable.modalview:
            return {
                ...state,
                modalview: !state.modalview
            }
        default:
            return state;
    }
}

//"type modal"
export const handleModalsTable = (type: string): any => {
    switch (type) {
        case "modalMedidas":
            return { type: TypesModalTable.modalMedidas };
        case "modalview":
            return { type: TypesModalTable.modalview };
        default:
            break;
    }
};
