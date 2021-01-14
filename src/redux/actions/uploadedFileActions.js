import { action } from "typesafe-actions";
import { UploadFileTypes, SetUploadedFile, SetStartEndRow } from "../../types/uploadedFileTypes";

export const setUploadedFile = (payload: Object): SetUploadedFile => action(UploadFileTypes.SET_UPLOADED_FILE, payload);
export const setStartEndRow = (payload: Object): SetStartEndRow => action(UploadFileTypes.SET_START_END_ROW, payload);