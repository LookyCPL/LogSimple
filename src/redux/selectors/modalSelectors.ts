import { ReduxState } from '../../types';

export const selectModal = (state: ReduxState) => {
    return state.modal;
};
