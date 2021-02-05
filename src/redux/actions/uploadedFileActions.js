import { action } from "typesafe-actions";
import { UploadFileTypes, SetUploadedFile, SetStartEndRow, ModifyUploadContent, SetUploadSearchExpression, UploadAction, ExpressionSearch } from "../../types/uploadedFileTypes";

export const setUploadedFile = (payload: Object): SetUploadedFile => action(UploadFileTypes.SET_UPLOADED_FILE, payload);
export const setStartEndRow = (payload: Object): SetStartEndRow => action(UploadFileTypes.SET_START_END_ROW, payload);
export const modifyUploadContent = (payload: Object): ModifyUploadContent => action(UploadFileTypes.MODIFY_UPLOAD_CONTENT, payload);
export const setUploadSearchExpression = (payload: Array): SetUploadSearchExpression => action(UploadFileTypes.SET_UPLOAD_SEARCH_EXPRESSION, payload);
export const expressionSearch = (): ExpressionSearch => action(UploadFileTypes.EXPRESSION_SEARCH);
export const uploadAction = (): UploadAction => action(UploadFileTypes.UPLOAD_ACTION);