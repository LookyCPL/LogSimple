import { ReduxState } from '../../types';

export const selectKeySeparatorList = (state: ReduxState) => {
    return state.keySeparatorList;
};
