import { modalInitial } from "../redux/initialState";

export const ModalTypes = {
    SET_MODAL: "SET_MODAL",
    RESET_MODAL: "RESET_MODAL",
    UPLOAD_MODAL: "UPLOAD_MODAL",
};

export type ModalState = modalInitial;

export interface SetModal {
    type: ModalTypes.SET_MODAL;
    payload: Object;
}

export interface ResetModal {
    type: ModalTypes.RESET_MODAL;
}

export type ModalAction =
    | SetModal
    | ResetModal;
