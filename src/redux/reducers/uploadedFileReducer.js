import { Reducer } from "redux";
import { uploadedFileInitial } from "../initialState";
import type { UploadedFileState, UploadFilesAction } from "../../types/uploadedFileTypes";
import { UploadFileTypes } from "../../types/uploadedFileTypes";
import { findMatchedIndexes } from "../../utils/methods";

export const uploadedFileReducer: Reducer<UploadedFileState, UploadFilesAction> = (state = uploadedFileInitial, action: UploadFilesAction) => {
    switch (action.type) {
      case UploadFileTypes.SET_UPLOADED_FILE:
        state = action.payload;
        return state;
      case UploadFileTypes.SET_START_END_ROW:
        state.startRow = action.payload.start;
        state.endRow = action.payload.end;
        return { ...state };
      case UploadFileTypes.SET_UPLOAD_SEARCH_EXPRESSION:
        state.uploadSearchExpression = action.payload;
        return {...state};
      case UploadFileTypes.MODIFY_UPLOAD_CONTENT:
        let temp = [];
        let searchIndexes = [];
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
      default:
        return state;
    }
};