import {uploadedFileInitial} from "../redux/initialState";

export const UploadFileTypes = {
    SET_UPLOADED_FILE: "SET_UPLOADED_FILE",
    SET_START_END_ROW: "SET_START_END_ROW",
};

export type UploadedFileState = uploadedFileInitial;

export interface SetUploadedFile {
    type: UploadFileTypes.SET_UPLOADED_FILE;
    payload: Object;
}

export interface SetStartEndRow {
    type: UploadFileTypes.SET_START_END_ROW;
    payload: Object;
}

export type UploadFilesAction =
    | SetUploadedFile
    | SetStartEndRow
