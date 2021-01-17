import { uploadedFileInitial } from "../redux/initialState";
import {ConfigTypes} from "./configTypes";

export const UploadFileTypes = {
  SET_UPLOADED_FILE: "SET_UPLOADED_FILE",
  SET_START_END_ROW: "SET_START_END_ROW",
  MODIFY_UPLOAD_CONTENT: "MODIFY_UPLOAD_CONTENT",
  SET_UPLOAD_SEARCH_EXPRESSION: "SET_UPLOAD_SEARCH_EXPRESSION",
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

export interface ModifyUploadContent {
  type: UploadFileTypes.MODIFY_UPLOAD_CONTENT;
  payload: String;
}

export interface SetUploadSearchExpression {
  type: ConfigTypes.SET_UPLOAD_SEARCH_EXPRESSION;
  payload: String;
}

export type UploadFilesAction =
  | SetUploadedFile
  | SetStartEndRow
  | ModifyUploadContent
  | SetUploadSearchExpression;
