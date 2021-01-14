import { combineReducers } from "redux";
import { filterListReducer } from "./reducers/filterReducer";
import { configReducer } from "./reducers/congfigReducer";
import { uploadedFileReducer } from "./reducers/uploadedFileReducer";
import { keySeparatorListReducer } from "./reducers/keySeparatorListReducer";
import { frameListReducer } from "./reducers/frameListReducer";
import { markUpListReducer } from "./reducers/markUpListReducer";
import { hoverReducer } from "./reducers/hoverReducer";
import { modalReducer } from "./reducers/modalReducer";

const allReducers = combineReducers({
  filterList: filterListReducer,
  frameList: frameListReducer,
  config: configReducer,
  markUpList: markUpListReducer,
  hover: hoverReducer,
  modal: modalReducer,
  uploadedFile: uploadedFileReducer,
  keySeparatorList: keySeparatorListReducer,
});

export default allReducers;
