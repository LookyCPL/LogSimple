import { action } from "typesafe-actions";
import { ModalTypes, SetModal, ResetModal } from "../../types/modalTypes";

export const setModal = (payload: Object): SetModal => action(ModalTypes.SET_MODAL, payload);
export const resetModal = (payload: Object): ResetModal => action(ModalTypes.RESET_MODAL, payload);
