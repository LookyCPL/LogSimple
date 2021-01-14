import { modalInitial } from "../redux/initialState";

export const ModalTypes = {
    SET_MODAL: "SET_MODAL",
};

export type ModalState = modalInitial;

export interface SetModal {
    type: ModalTypes.SET_MODAL;
    payload: Object;
}

export type ModalAction =
    | SetModal
