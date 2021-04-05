import {initialState, modalInitial} from "../redux/initialState";


// --------------------------------------------- STORE LOGIC -------------------------------------------
export const saveSessionState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (error) {
      // catch some shit here
  }
};

export const loadSessionState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");

    if (serializedState === null) return initialState;

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// --------------------------------------------- UPLOAD LOGIC -------------------------------------------

const keyRecognize = (row, keyList) => {
    //date check
    for (const key of keyList) {

        let temp = row.substring(0, key.length);
        if (!isNaN(Date.parse(temp.replace(",", ".")))) {
            return temp;
        }
    }
    return "unknown";
};

export const dataSeparate = (rows, keyList) => {
    let index = 0;
    let frameList = [];

    rows.forEach((row) => {
        const key = keyRecognize(row, keyList);
        const data = row.substring(key.length, row.length);

        if (key !== "unknown") {
            let object = {};
            object.index = index;
            object.key = key;
            object.isMarked = false;
            object.colorClass = "default";
            object.filterItemList = [];
            object.data =  data;
            object.dataLengthList = [data.length];
            frameList.push(object);
            index++;
        }  else {
            if(frameList.length > 0){
                frameList[frameList.length - 1].data += "\n" + row;
                frameList[frameList.length - 1].dataLengthList.push(row.length);
            }
        }
    });
    return frameList;
};

// ------------------------- FILTER LOGIC -----------------------------------------------
export const filterItemAddHandle = (filterList, filter) => {
    const hasDuplicity = filterList.some((f) => f.key.search(filter) > -1);
    if (hasDuplicity) return "duplicity";

    const tempList = filterList.filter((f) => filter.search(f.key) === -1);
    tempList.push({
        key: filter,
        isFilterOn: true,
    });
    return tempList;
};

export const filterItemRemoveHandle = (filterList, filter) => {

    return filterList.filter((f) => f.key !== filter);
};

export const filterItemAssign = (frameList, filter) => {

    frameList.forEach((frame) => {
        // delete sub-duplicities throw all filter items
        if (frame.filterItemList.length > 0) {
            frame.filterItemList = frame.filterItemList.filter(
                (f) => filter.search(f.id) === -1
            );
        }

        // check if new filter is match in data
        if (frame.data.search(filter) > -1) {
            const matches = frame.data.matchAll(RegExp(filter, "g"));
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
            frame.filterItemList.push(filterItem);
        }
    });
    return [...frameList];
};

export const filterItemUnAssignHandle = (frameList, filter) => {

    frameList.forEach((frame) => {
        if (frame.filterItemList.length > 0) {
            for (let i = 0; i < frame.filterItemList.length; i++) {
                if (frame.filterItemList[i].id === filter) {
                    frame.filterItemList.splice(i, 1);
                    break;
                }
            }
        }
    });
    return [...frameList];
};

export const changeFilterStateHandle = (filter, filterList) => {

    for (let item of filterList) {
        if (item.key === filter) {
            item.isFilterOn = !item.isFilterOn;
        }
    }
    return [...filterList];
};
// ------------------------- MARK UP LIST LOGIC -----------------------------------------------

export const markUpListSetHandle = (frameList, index, markUpList, isMarked, styleList) => {

    const style = styleList.filter((i) => (i !== null))[0];

    if (!isMarked) {
        markUpList.push({
            index: index,
            key: frameList[index].key,
            style: style,
        });
    } else {
        markUpList = markUpList.filter((f) => f.index !== index);
    }

    return markUpList.flat().sort((a, b) => {
        if (parseInt(a.index) > parseInt(b.index)) return 1;
        if (parseInt(a.index) < parseInt(b.index)) return -1;
        return 0;
    });
};

export const markUpStyleListHandle = (isMarked, styleListIndex, styleList, style) => {

    if (!isMarked) {

        for (let i = 0; i < styleList.length; i++) {
            if (styleList[i] !== null) {
                styleList[i] = null;
                break;
            }
        }
    } else {
        styleList[styleListIndex] = style;
    }
    return [...styleList];
};

export const markRowHandle = (frameList, index, isMarked, styleList) => {

    if (isMarked) {
        for (let style of styleList) {
            if (style !== null) {
                frameList[index].colorClass = style.class;
                break;
            }
        }
    } else {
        frameList[index].colorClass = "default";
    }
    frameList[index].isMarked = isMarked;
    return [...frameList];
};

// ------------------------- USAGE METHODS -----------------------------------------------

export const filterIndexListMerge = (filterItemList) =>
    filterItemList
        .map((filterItem) => filterItem.indexList)
        .flat()
        .sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
        });

export const generateHoverStyle = (title, className, rect, type) => {
    let style;

    switch (type) {
        case "MARK_UP":
            style = {
                color: "#000000",
                padding: "2px 7px",
                width: "auto",
                fontWeight: "bold",
                height: "18px",
                border: "solid 1px #000000",
                borderRadius: "1em",
                position: "fixed",
                left: (rect.x + 40) + "px",
                top: (rect.y + 13) + "px",
            };
            break;
        default:
            style = {};
    }
    return {
        title: title,
        class: className,
        style: style
    };
};

export const getModalStyle = (type) => {
  switch (type) {
    case "UPLOAD_MODAL":
      return {
        class: "modal-bg",
        type: "UPLOAD_MODAL",
      };
      default: {
          return modalInitial;
      }
  }
};

export const getRowCount = (isFilterBound, filterList, frameList) => {
    const listByOnState = filterList.filter((f) => f.isFilterOn);
    const filterKeys = listByOnState.map((f) => f.key);

    if (listByOnState.length === 0) return frameList.length;

       if(!isFilterBound){
           return frameList.filter((frame) => (frame.filterItemList.filter((fr) => filterKeys.indexOf(fr.id) > -1).length) > 0).length;
       }
       else {
           return frameList.filter((frame) => (frame.filterItemList.filter((fr) => filterKeys.indexOf(fr.id) > -1).length) === listByOnState.length).length;
       }
};

export const generateFrameClass = (isFilterBound, filterList, frame) => {
    const listByOnState = filterList.filter((f) => f.isFilterOn);

    if (listByOnState.length === 0) return "default";
    if (listByOnState.length > 0 && frame.filterItemList.length === 0) return "hidden";

    const filterKeys = listByOnState.map((f) => f.key);
    const matchCount = frame.filterItemList.filter((fr) => filterKeys.indexOf(fr.id) > -1).length;
    if (isFilterBound && matchCount === listByOnState.length || !isFilterBound && matchCount > 0) return "default";
    return "hidden";
};

export const findMatchedIndexes = (text, expression) => {

    const matches = text.matchAll(RegExp(expression, "g"));
    return Array.from(matches).map((match) => ({
        start: match.index,
        end: match.index + match[0].length,
    }));
};





