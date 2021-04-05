import { ReduxState } from '../../types';

export const selectMarkupList = (state: ReduxState) => {
    return state.markUpList;
};
