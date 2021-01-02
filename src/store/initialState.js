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
  isMarkUpListExpanded: true,
  markUpStyleList: fillMartUpStyleList(),
};

const hoverStyleInitial = {
  title: "someTitle",
  class: "someClass",
  style: {
   display: "none"
  }
};

export const initialState = {
  filterList: filterListInitial,
  frameList: frameListInitial,
  markUpList: markUpListInitial,
  generalConfig: configInitial,
  hoverStyle: hoverStyleInitial,
};
