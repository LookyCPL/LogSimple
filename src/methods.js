import moment from "moment";

// --------------------------------------------- UPLOAD LOGIC -------------------------------------------
const keyRecognize = (data) => {
  const dateFormatTypeList = [
    "YYYY-MM-DD HH:mm:ss,SSS",
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD",
  ];

  //date check
  for (const format of dateFormatTypeList) {
    let temp = data.substring(0, format.length);
    if (!isNaN(Date.parse(temp.replace(",", ".")))) {
      return temp;
    }
  }
  return "unknown";
};

const separateKeys = (rows) => {
  return rows
    .map((row) => keyRecognize(row))
    .filter((key) => key !== "unknown");
};

export const dataSeparate = (fileContent) => {
  const rows = fileContent.split("\n");
  let keyList = separateKeys(rows);

  let dataList = [];
  let separatorCount = 0;
  let rowCount = 0;

  rows.forEach((row) => {
    const keyListOnSeparator = keyList[separatorCount];
    let index = row.search(keyListOnSeparator);

    if (index === 0) {
      dataList.push(row.substring(keyListOnSeparator.length, row.length));
      if (separatorCount < keyList.length - 1) separatorCount++;
      rowCount++;
    } else if (index > 0) {
      dataList.push(
        row.substring(0, index) +
          row.substring(index + keyListOnSeparator.length, row.length)
      );
      if (separatorCount < keyList.length - 1) separatorCount++;
      rowCount++;
    } else {
      dataList.splice(
        rowCount - 1,
        rowCount - 1,
        dataList[rowCount - 1] + "\n" + row
      );
    }
  });

  return {
    isMarked: Array(keyList.length).fill(false),
    key: keyList,
    data: dataList,
    class: Array(keyList.length).fill("default"),
    filterItemList: Array(keyList.length).fill([]),
  };
};

// ------------------------- FILTER LOGIC -----------------------------------------------
export const filterItemAddHandle = (filterList, filter) => {
  const hasDuplicity = filterList.some((f) => f.search(filter) > -1);
  if (hasDuplicity) return "duplicity";

  const tempList = filterList.filter((f) => filter.search(f) === -1);
  tempList.push(filter);
  sessionStorage.setItem("filterList", JSON.stringify(tempList));
  return tempList;
};

export const filterItemRemoveHandle = (filterList, filter) => {
  let tempList = filterList.filter((f) => f !== filter);
  sessionStorage.setItem("filterList", JSON.stringify(tempList));
  return tempList;
};

export const filterItemAssign = (object, filter) => {
  let dataList = object.data;
  let tempClassList = [];

  for (let r = 0; r < dataList.length; r++) {
    // delete sub-duplicities throw all filter items
    if (object.filterItemList[r].length > 0) {
      object.filterItemList[r] = object.filterItemList[r].filter(
        (f) => filter.search(f.id) === -1
      );
    }

    // check if new filter is match in data
    if (dataList[r].search(filter) > -1) {
      const matches = dataList[r].matchAll(RegExp(filter, "g"));
      const subIndexList = Array.from(matches).map((match) => ({
        id: match.index,
        start: match.index,
        end: match.index + match[0].length,
      }));
      const filterItem = {
        id: filter,
        caseSens: false,
        matchWord: false,
        indexList: subIndexList,
      };

      object.filterItemList[r].push(filterItem);

      tempClassList.push("default");
    } else {
      tempClassList.push("hidden");
    }
  }
  object.class = tempClassList;
  sessionStorage.setItem("frameList", JSON.stringify(object));
  return { ...object };
};

export const filterItemUnAssignHandle = (object, filter) => {
  let tempClassList = [];

  for (let w = 0; w < object.filterItemList.length; w++) {
    if (object.filterItemList[w].length > 0) {
      for (let i = 0; i < object.filterItemList[w].length; i++) {
        if (object.filterItemList[w][i].id === filter) {
          object.filterItemList[w].splice(i, 1);
          break;
        }
      }
    }
    if (object.filterItemList[w].length > 0) {
      tempClassList.push("default");
    } else {
      tempClassList.push("hidden");
    }
  }

  if (object.filterItemList.flat().length === 0) {
    tempClassList.fill("default", 0, tempClassList.length);
  }
  object.class = tempClassList;
  sessionStorage.setItem("frameList", JSON.stringify(object));
  return { ...object };
};

// ------------------------- USAGE LOGIC -----------------------------------------------

export const filterIndexListMerge = (filterItemList) =>
  filterItemList
    .map((filterItem) => filterItem.indexList)
    .flat()
    .sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });

export const markRowHandle = (object, index, isMarked) => {
  object.isMarked[index] = isMarked;
  return { ...object };
};
