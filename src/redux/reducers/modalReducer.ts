import { Reducer } from "redux";
import type { ModalState, ModalAction } from "../../types";
import { ModalTypes } from "../../types";
import { modalInitial } from "../initialState";

export const modalReducer: Reducer<ModalState, ModalAction> = (state = modalInitial, action: ModalAction) => {
  switch (action.type) {
    case ModalTypes.SET_MODAL:
      if ("payload" in action) {
        return action.payload;
      }
      return state;
    case ModalTypes.RESET_MODAL:
     return modalInitial;
    default:
      return state;
  }
};
