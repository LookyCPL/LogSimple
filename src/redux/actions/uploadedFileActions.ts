import { action } from "typesafe-actions";
import {
    UploadFileTypes,
    SetUploadedFile,
    SetStartEndRow,
    ModifyUploadContent,
    SetUploadSearchExpression,
    UploadAction,
    ExpressionSearch,
    UploadedFileState, RowIndexes
} from "../../types";

export const setUploadedFile = (payload: UploadedFileState): SetUploadedFile => action(UploadFileTypes.SET_UPLOADED_FILE, payload);
export const setStartEndRow = (payload: RowIndexes): SetStartEndRow => action(UploadFileTypes.SET_START_END_ROW, payload);
export const modifyUploadContent = (payload: string): ModifyUploadContent => action(UploadFileTypes.MODIFY_UPLOAD_CONTENT, payload);
export const setUploadSearchExpression = (payload: string): SetUploadSearchExpression => action(UploadFileTypes.SET_UPLOAD_SEARCH_EXPRESSION, payload);
export const expressionSearch = (payload: undefined): ExpressionSearch => action(UploadFileTypes.EXPRESSION_SEARCH, payload);
export const uploadAction = (payload: undefined): UploadAction => action(UploadFileTypes.UPLOAD_ACTION, payload);