import { action } from "typesafe-actions";
import { ModalTypes, SetModal } from "../../types/modalTypes";

export const setModal = (payload: Object): SetModal => action(ModalTypes.SET_MODAL, payload);
