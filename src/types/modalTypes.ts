
export const ModalTypes = {
    SET_MODAL: "SET_MODAL",
    RESET_MODAL: "RESET_MODAL",
    UPLOAD_MODAL: "UPLOAD_MODAL",
};

export interface Modal {
    class: string
    type: string
}

export type ModalState = Modal;

export interface SetModal {
    type: typeof ModalTypes.SET_MODAL;
    payload: ModalState;
}

export interface ResetModal {
    type: typeof ModalTypes.RESET_MODAL;
}

export type ModalAction =
    | SetModal
    | ResetModal;
