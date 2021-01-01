import { combineReducers } from "redux";
import { initialState } from "../store/initialState";

const frameListReducer = (state = initialState.frameList, action) => {
  if (action.type === "SET_FRAME_LIST") {
    return action.new;
  } else {
    return state;
  }
};

const filterListReducer = (state = initialState.filterList, action) => {
  if (action.type === "SET_FILTER_LIST") {
    return action.new;
  } else {
    return state;
  }
};

const markUpListReducer = (state = initialState.markUpList, action) => {
  if (action.type === "SET_MARK_UP_LIST") {
    return action.new;
  } else {
    return state;
  }
};

const generalConfigReducer = (state = initialState.generalConfig, action) => {
  switch (action.type) {
    case "UPLOAD_FILE":
      state.fileName = action.fileName;
      state.isUploaded = true;
      return state;
    case "SET_ROW_COUNT":
      state.rowCount = action.rowCount;
      return state;
    case "SET_FILTER_BIND":
      state.isFilterBound = action.isBound;
      return state;
    case "SET_MARK_UP_LIST_EXPANDED":
      const isExpanded = state.isMarkUpListExpanded;
      state.isMarkUpListExpanded = !isExpanded;
      return state;
    case "SET_COLOR_INDEX":
      state.colorIndex = action.index;
      return state;
    case "SET_LETTER_INDEX":
      state.letterIndex = action.index;
      return state;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  filterList: filterListReducer,
  frameList: frameListReducer,
  generalConfig: generalConfigReducer,
  markUpList: markUpListReducer,
});

export default allReducers;
