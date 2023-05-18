// Creamos una interfaz que define el estado del reducer
export interface ModalState {
  modalMedidas: boolean;
  modalView: boolean;
  modalArticuloInsumo: boolean;
  modalCategoria: boolean;
}
// Creamos una interfaz que define la forma de la acción del reducer
export interface ModalAction {
  type: string;
}
