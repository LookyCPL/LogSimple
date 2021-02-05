import { Reducer } from "redux";
import type { ModalState, ModalAction } from "../../types/modalTypes";
import { ModalTypes } from "../../types/modalTypes";
import { modalInitial } from "../initialState";

export const modalReducer: Reducer<ModalState, ModalAction> = (state = modalInitial, action: ModalAction) => {
  switch (action.type) {
    case ModalTypes.SET_MODAL:
      return action.payload;
    case ModalTypes.RESET_MODAL:
     return modalInitial;
    default:
      return state;
  }
};
