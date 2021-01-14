import { ReduxState } from '../../types';

export const selectUploadedFile = (state: ReduxState) => {
    return state.uploadedFile;
};
