import { ReduxState } from '../../types';

export const selectFrameList = (state: ReduxState) => {
    return state.frameList;
};
