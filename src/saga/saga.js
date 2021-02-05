import { put, takeEvery, select } from "redux-saga/effects";
import { modifyUploadContent } from "../redux/actions/uploadedFileActions";
import { UploadFileTypes } from "../types/uploadedFileTypes";
import { selectUploadedFile } from "../redux/selectors/uploadedFileSelectors";

function* setUploadContent() {

    let uploadFile = yield select(selectUploadedFile);
    yield put(modifyUploadContent(uploadFile.uploadSearchExpression));
}

function* uploadSaga() {
  yield takeEvery(UploadFileTypes.EXPRESSION_SEARCH, setUploadContent);
}

export default uploadSaga;
