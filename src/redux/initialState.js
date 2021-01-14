import {markUpStyleList} from "../utils/initialMarkUpListStyle";

export const filterListInitial = [];
export const markUpListInitial = [];
export const frameListInitial = [];
export const configInitial = {
  isUploaded: false,
  isFilterBound: false,
  isMarkUpListExpanded: true,
  uploadContentScrollUp: 0,
  markUpStyleList: markUpStyleList,
};
export const hoverInitial = {
  title: "",
  class: "hidden",
  style: {},
};
export const modalInitial = {
  class: "hidden",
  type: "none",
};

export const uploadedFileInitial = {
  fileName: "",
  contentType: "",
  size: 0,
  rowCount: 0,
  content: "",
  startRow: 0,
  endRow: 0,
};

export const keySeparatorListInitial = [
  {
    type: "DATE_TYPES",
    formatters: [
      {
        value: "YYYY-MM-DD HH:mm:ss,SSS",
        isPickedUp: false,
      },
      {
        value: "YYYY-MM-DD HH:mm:ss",
        isPickedUp: false,
      },
      {
        value: "YYYY-MM-DD",
        isPickedUp: false,
      },
    ],
  },
  {
    type: "VAR_TYPES",
    formatters: [],
  },
];


export const initialState = {
  filterList: filterListInitial,
  markUpList: markUpListInitial,
  frameList: frameListInitial,
  hover: hoverInitial,
  modal: modalInitial,
  uploadedFile: uploadedFileInitial,
  keySeparatorList: keySeparatorListInitial,
};