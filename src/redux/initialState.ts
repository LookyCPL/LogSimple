import { markUpStyleList } from "../utils/initialMarkUpListStyle";
import {ConfigState, FrameHeight, LobbyConfig} from "../types";

export const filterListInitial = [];
export const markUpListInitial = [];
export const frameListInitial = [];

export const topFrameInitial: FrameHeight = {
  index: 0,
  height: 0,
  top: 0,
  orderIndex: 0,
}

export const lobbyConfigInitial: LobbyConfig = {
  totalHeight: 0,
  lobbyHeight: 0,
  lobbyWidth: 0,
  frameHeightList: [],
  topFrame: topFrameInitial,
};

export const configInitial: ConfigState = {
  isUploaded: false,
  isFilterBound: false,
  isMarkUpListExpanded: true,
  markUpStyleList: markUpStyleList,
  charWidthMap: new Map<string, number>(),
  lobbyConfig: lobbyConfigInitial,
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
  content: [],
  uploadSearchIndexes: [],
  uploadSearchExpression: "",
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
