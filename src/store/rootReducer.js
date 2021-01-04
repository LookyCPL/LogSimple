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
    case "SET_FILTER_BIND":
      state.isFilterBound = action.isBound;
      return state;
    case "SET_MARK_UP_LIST_EXPANDED":
      const isExpanded = state.isMarkUpListExpanded;
      state.isMarkUpListExpanded = !isExpanded;
      return state;
    case "SET_MARK_UP_STYLE_LIST":
      state.markUpStyleList = action.new;
      return state;
    default:
      return state;
  }
};

const hoverStyleReducer = (state = initialState.hoverStyle, action) => {
  switch (action.type) {
    case "SET_HOVER_STYLE":
      state = action.new;
      return state;
    case "RESET_HOVER_STYLE":
      state = initialState.hoverStyle;
      return state;
    default:
      return state;
  }
};

const hoverModalReducer = (state = initialState.modalStyle, action) => {
  switch (action.type) {
    case "SET_MODAL_TYPE":
      state = action.new;
      return state;
    case "RESET_MODAL":
      state = initialState.modalStyle;
      return state;
    default:
      return state;
  }
};

const chosenKeyListReducer = (state = initialState.chosenKeyList, action) => {
  if (action.type === "CHOSEN_KEY_LIST_HANDLE") {
    if (action.isDelete) {
      state = state.filter((k) => k !== action.key);
    } else {
      let temp = [action.key];
      state = [...state, ...temp];
    }
    return state;
  } else {
    return state;
  }
};

const uploadedFileReducer = (state = initialState.uploadedFile, action) => {
  if (action.type === "SET_UPLOADED_FILE") {
    state = action.new;
    return state;
  } else {
    return state;
  }
};

const keySeparatorListReducer = (state = initialState.keySeparatorList, action) => {
  if (action.type === "SET_VARIABLE_KEYS") {
    const newVarKeys = {
      type: "VAR_TYPES",
      values: action.newKeys,
    };
    const withoutVars = state.filter((s) => s.type !== "VAR_TYPES");
    withoutVars.push(newVarKeys);
    return withoutVars;
  } else {
    return state;
  }
};

const allReducers = combineReducers({
  filterList: filterListReducer,
  frameList: frameListReducer,
  generalConfig: generalConfigReducer,
  markUpList: markUpListReducer,
  hoverStyle: hoverStyleReducer,
  modalStyle: hoverModalReducer,
  uploadedFile: uploadedFileReducer,
  keySeparatorList: keySeparatorListReducer,
  chosenKeyList: chosenKeyListReducer,
});

export default allReducers;
