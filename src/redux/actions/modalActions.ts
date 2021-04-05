import { action } from "typesafe-actions";
import {ModalTypes, SetModal, ResetModal, ModalState} from "../../types";

export const setModal = (payload: ModalState): SetModal => action(ModalTypes.SET_MODAL, payload);
export const resetModal = (): ResetModal => action(ModalTypes.RESET_MODAL);
