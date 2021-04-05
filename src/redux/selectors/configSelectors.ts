import { ReduxState } from '../../types';

export const selectConfig = (state: ReduxState) => {
    return state.config;
};
