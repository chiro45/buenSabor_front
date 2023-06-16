import { TypesModalTable } from "../../Types/TypesModalTable";
import { IModalState, IModalAction } from "./IModalState";

// Definimos el estado inicial
const initialState: IModalState = {
  modalMedidas: false,
  modalView: false,
  modalArticuloInsumo: false,
  modalCategoria: false,
  modalArticuloManufacturado: false
};

// Creamos el reducer de los modales
export const ModalsReducer = (state = initialState, action: IModalAction) => {
  // Desestructuramos el estado para facilitar el acceso a sus propiedades
  const { modalMedidas, modalView, modalArticuloInsumo, modalCategoria, modalArticuloManufacturado } = state;

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
    case TypesModalTable.modalArticuloManufacturado:
      return { ...state, modalArticuloManufacturado: !modalArticuloManufacturado };
    // Si la acción no corresponde a ninguna de las anteriores, retornamos el estado tal cual
    default:
      return state;
  }
};

// Creamos un objeto que contiene las acciones posibles del reducer
const modalActions: { [key: string]: { type: string } } = {
  modalMedidas: { type: TypesModalTable.modalMedidas },
  modalArticuloInsumo: { type: TypesModalTable.modalArticuloInsumo },
  modalView: { type: TypesModalTable.modalView },
  modalCategoria: { type: TypesModalTable.modalCategoria },
  modalArticuloManufacturado: { type: TypesModalTable.modalArticuloManufacturado },
};

// Creamos una función que toma un tipo de acción y devuelve la acción correspondiente del objeto modalActions
export const handleModalsTable = (type: string) => modalActions[type];
