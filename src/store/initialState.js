const fillMartUpStyleList = () => {
  let cssColorClassList = [
    "lightGreen", //#66ff66
    "lightBlue", //#33ccff
    "lightPink", //#ff99ff
    "green", //#00cc00
    "blue", //#0000ff
    "pink", //#ff00ff
    "darkGreen", //#006600
    "darkBlue", //#000080
    "darkPink", //#cc00cc
  ];

  const colorClassListShift = () => {
    let firstValue = cssColorClassList[0];
    cssColorClassList.shift();
    cssColorClassList.push(firstValue);
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXY";
  let index = 0;
  let styleList = [];

  for (let i = 0; i < cssColorClassList.length; i++) {
    let colorIndex = 0;

    for (let h = 0; h < alphabet.length; h++) {
      styleList.push({
        index: index,
        class: "markUp " + cssColorClassList[colorIndex],
        letter: alphabet[h],
      });

      colorIndex === 8 ? (colorIndex = 0) : colorIndex++;
      index++;
    }
    colorClassListShift();
  }
  return styleList;
};

const filterListInitial = [];
const markUpListInitial = [];
const frameListInitial = [

];
const configInitial = {
  isUploaded: false,
  isFilterBound: false,
  isMarkUpListExpanded: true,
  markUpStyleList: fillMartUpStyleList(),
};
const hoverStyleInitial = {
  title: "",
  class: "hidden",
  style: {},
};
const modalStyleInitial = {
  class: "hidden",
  type: "none",
};

const uploadedFileInitial = {
  fileName: "",
  contentType: "",
  size: 0,
  rowCount: 0,
  content: "",
  startRow: 0,
  endRow: 0,
};

const chosenKeyListInitial = [];

const keySeparatorListInitial = [
  {
    type: "DATE_TYPES",
    values: ["YYYY-MM-DD HH:mm:ss,SSS", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD"],
  },
  {
    type: "VAR_TYPES",
    values: [],
  },
];
export const initialState = {
  filterList: filterListInitial,
  frameList: frameListInitial,
  markUpList: markUpListInitial,
  generalConfig: configInitial,
  hoverStyle: hoverStyleInitial,
  modalStyle: modalStyleInitial,
  uploadedFile: uploadedFileInitial,
  keySeparatorList: keySeparatorListInitial,
  chosenKeyList: chosenKeyListInitial,
};
