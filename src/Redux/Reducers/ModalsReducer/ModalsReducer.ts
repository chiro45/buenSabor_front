import { TypesModalTable } from "../../Types/TypesModalTable";

// Creamos una interfaz que define el estado del reducer
interface ModalState {
  modalMedidas: boolean;
  modalView: boolean;
  modalArticuloInsumo: boolean;
  modalCategoria: boolean
}

// Definimos el estado inicial
const initialState: ModalState = {
  modalMedidas: false,
  modalView: false,
  modalArticuloInsumo: false,
  modalCategoria: false
};

// Creamos una interfaz que define la forma de la acción del reducer
interface ModalAction {
  type: string;
}

// Creamos el reducer de los modales
export const ModalsReducer = (state = initialState, action: ModalAction) => {
  // Desestructuramos el estado para facilitar el acceso a sus propiedades
  const { modalMedidas, modalView, modalArticuloInsumo, modalCategoria } = state;

  switch (action.type) {
    // Si la acción es modalMedidas, invertimos su valor en el estado
    case TypesModalTable.modalMedidas:
      return { ...state, modalMedidas: !modalMedidas };
    // Si la acción es modalView, invertimos su valor en el estado
    case TypesModalTable.modalView:
      return { ...state, modalView: !modalView };
    // Si la acción es modalArticuloInsumo, invertimos su valor en el estado
    case TypesModalTable.modalArticuloInsumo:
      return { ...state, modalArticuloInsumo: !modalArticuloInsumo };
      // Si la acción es modalCategory, invertimos su valor en el estado
    case TypesModalTable.modalCategoria:
      return { ...state, modalCategoria: !modalCategoria };
    // Si la acción no corresponde a ninguna de las anteriores, retornamos el estado tal cual
    default:
      return state;
  }
};

// Creamos un objeto que contiene las acciones posibles del reducer
const modalActions: { [key: string]: { type: string } }  = {
  modalMedidas: { type: TypesModalTable.modalMedidas },
  modalArticuloInsumo: { type: TypesModalTable.modalArticuloInsumo },
  modalView: { type: TypesModalTable.modalView },
  modalCategoria: { type: TypesModalTable.modalCategoria },
};

// Creamos una función que toma un tipo de acción y devuelve la acción correspondiente del objeto modalActions
export const handleModalsTable = (type: string) => modalActions[type];
