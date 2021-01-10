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


const uploadedFileReducer = (state = initialState.uploadedFile, action) => {
  switch (action.type) {
    case "SET_UPLOADED_FILE":
      state = action.new;
      return state;
    case "SET_START_END_ROW":
      state.startRow = action.start;
      state.endRow = action.end;
      return { ...state };
    default:
      return state;
  }
};

const keySeparatorListReducer = (
  state = initialState.keySeparatorList,
  action
) => {
  switch (action.type) {
    case "SET_VARIABLE_KEYS":
      const newVarKeys = {
        type: "VAR_TYPES",
        values: action.newKeys,
      };
      const withoutVars = state.filter((s) => s.type !== "VAR_TYPES");
      withoutVars.push(newVarKeys);
      return withoutVars;
    case "CHOSEN_KEY_LIST_HANDLE":
      for (let keyList of state) {
        if (keyList.type === action.keyType) {
          for (let formatter of keyList.formatters) {
            if (formatter.value === action.key) {
              formatter.isPickedUp = action.isPickedUp;
              break;
            }
          }
          break;
        }
      }
      return [...state];
    default:
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
});

export default allReducers;
