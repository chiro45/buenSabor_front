// Creamos una interfaz que define el estado del reducer
export interface IModalState {
  modalMedidas: boolean;
  modalView: boolean;
  modalArticuloInsumo: boolean;
  modalCategoria: boolean;
}
// Creamos una interfaz que define la forma de la acción del reducer
export interface IModalAction {
  type: string;
}
