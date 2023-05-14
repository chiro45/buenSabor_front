import { TypesModalTable } from "../../Types/TypesModalTable";

// Creamos una interfaz que define el estado del reducer
interface ModalState {
  modalMedidas: boolean;
  modalview: boolean;
  modalArticuloInsumo: boolean;
}

// Definimos el estado inicial
const initialState: ModalState = {
  modalMedidas: false,
  modalview: false,
  modalArticuloInsumo: false,
};

// Creamos una interfaz que define la forma de la acción del reducer
interface ModalAction {
  type: string;
}

// Creamos el reducer de los modales
export const ModalsReducer = (state = initialState, action: ModalAction) => {
  // Desestructuramos el estado para facilitar el acceso a sus propiedades
  const { modalMedidas, modalview, modalArticuloInsumo } = state;

  switch (action.type) {
    // Si la acción es modalMedidas, invertimos su valor en el estado
    case TypesModalTable.modalMedidas:
      return { ...state, modalMedidas: !modalMedidas };
    // Si la acción es modalview, invertimos su valor en el estado
    case TypesModalTable.modalview:
      return { ...state, modalview: !modalview };
    // Si la acción es modalArticuloInsumo, invertimos su valor en el estado
    case TypesModalTable.modalArticuloInsumo:
      return { ...state, modalArticuloInsumo: !modalArticuloInsumo };
    // Si la acción no corresponde a ninguna de las anteriores, retornamos el estado tal cual
    default:
      return state;
  }
};

// Creamos un objeto que contiene las acciones posibles del reducer
const modalActions: { [key: string]: { type: string } }  = {
  modalMedidas: { type: TypesModalTable.modalMedidas },
  modalArticuloInsumo: { type: TypesModalTable.modalArticuloInsumo },
  modalview: { type: TypesModalTable.modalview },
};

// Creamos una función que toma un tipo de acción y devuelve la acción correspondiente del objeto modalActions
export const handleModalsTable = (type: string) => modalActions[type];
