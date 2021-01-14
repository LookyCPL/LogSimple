import { ReduxState } from '../../types';

export const selectFilterList = (state: ReduxState) => {
    return state.filterList;
};
