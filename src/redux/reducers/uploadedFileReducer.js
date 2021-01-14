import { Reducer } from "redux";
import { uploadedFileInitial } from "../initialState";
import type { UploadedFileState, UploadFilesAction } from "../../types/uploadedFileTypes";
import { UploadFileTypes } from "../../types/uploadedFileTypes";

export const uploadedFileReducer: Reducer<UploadedFileState, UploadFilesAction> = (state = uploadedFileInitial, action: UploadFilesAction) => {
    switch (action.type) {
        case UploadFileTypes.SET_UPLOADED_FILE:
            state = action.payload;
            return state;
        case UploadFileTypes.SET_START_END_ROW:
            state.startRow = action.payload.start;
            state.endRow = action.payload.end;
            return { ...state };
        default:
            return state;
    }
};