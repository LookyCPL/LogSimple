export const UploadFileTypes = {
  SET_UPLOADED_FILE: "SET_UPLOADED_FILE",
  SET_START_END_ROW: "SET_START_END_ROW",
  MODIFY_UPLOAD_CONTENT: "MODIFY_UPLOAD_CONTENT",
  SET_UPLOAD_SEARCH_EXPRESSION: "SET_UPLOAD_SEARCH_EXPRESSION",
  UPLOAD_ACTION: "UPLOAD_ACTION",
  EXPRESSION_SEARCH: "EXPRESSION_SEARCH",
};

export interface RowIndexes {
  start: number;
  end: number;
}

export interface FileRow {
  row: string;
  index: number;
  indexList: RowIndexes[];
}

export interface UploadedFile {
  fileName: string;
  contentType: string;
  size: number;
  rowCount: number;
  content: FileRow[];
  uploadSearchIndexes: number[];
  uploadSearchExpression: string;
  startRow: number;
  endRow: number;
}

export type Directions = 'UP' | 'DOWN';

export type UploadedFileState = UploadedFile;

export interface SetUploadedFile {
  type: typeof UploadFileTypes.SET_UPLOADED_FILE;
  payload: UploadedFileState;
}

export interface SetStartEndRow {
  type: typeof UploadFileTypes.SET_START_END_ROW;
  payload: RowIndexes;
}

export interface ModifyUploadContent {
  type: typeof UploadFileTypes.MODIFY_UPLOAD_CONTENT;
  payload: string;
}

export interface SetUploadSearchExpression {
  type: typeof UploadFileTypes.SET_UPLOAD_SEARCH_EXPRESSION;
  payload: string;
}
export interface UploadAction {
  type: typeof UploadFileTypes.UPLOAD_ACTION;
  payload: undefined;
}

export interface ExpressionSearch {
  type: typeof UploadFileTypes.EXPRESSION_SEARCH;
  payload: undefined;
}

export type UploadFilesAction =
  | SetUploadedFile
  | SetStartEndRow
  | ModifyUploadContent
  | SetUploadSearchExpression
  | UploadAction
  | ExpressionSearch;
