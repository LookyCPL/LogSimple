const filterListInitial = [];
const markUpListInitial = [];
const frameListInitial = {
  isMarked: [false],
  colorClass: ["default"],
  class: ["hidden"],
  key: ["key1"],
  data: ["data1"],
  filterItemList: [[]],
};
const configInitial = {
  rowCount: 0,
  fileName: "unknown",
  isUploaded: false,
  isFilterBound: false,
  isMarkUpListExpanded: false,
  colorIndex: 0,
  letterIndex: 0,
};

export const initialState = {
  filterList: filterListInitial,
  frameList: frameListInitial,
  markUpList: markUpListInitial,
  generalConfig: configInitial,
};
