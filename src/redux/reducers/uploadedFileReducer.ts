import { Reducer } from "redux";
import { uploadedFileInitial } from "../initialState";
import {
  FileRow,
  RowIndexes,
  UploadedFileState,
  UploadFilesAction,
} from "../../types";
import {UploadFileTypes} from "../../types";
import {findMatchedIndexes} from "../../utils/methods";

export const uploadedFileReducer: Reducer<UploadedFileState,
    UploadFilesAction> = (state = uploadedFileInitial, action: UploadFilesAction) => {
  switch (action.type) {
    case UploadFileTypes.SET_UPLOADED_FILE:
      state = <UploadedFileState>action.payload;
      return state;

    case UploadFileTypes.SET_START_END_ROW:
      const payload = <RowIndexes>action.payload;
      state.startRow = payload.start;
      state.endRow = payload.end;
      return {...state};

    case UploadFileTypes.MODIFY_UPLOAD_CONTENT:
      let temp: FileRow[] = [];
      let searchIndexes: number[] = [];

      state.content.map((item, i) => {
        const matches = findMatchedIndexes(item.row, action.payload);

        temp.push({
          row: item.row,
          index: i,
          indexList: matches,
        });

        if (matches.length > 0) searchIndexes.push(i);
      });
      state.uploadSearchIndexes = searchIndexes;
      state.content = temp;
      return { ...state };

    case UploadFileTypes.SET_UPLOAD_SEARCH_EXPRESSION:
      state.uploadSearchExpression = <string>action.payload;
      return { ...state };

    default:
      return state;
  }
};
