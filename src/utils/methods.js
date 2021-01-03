import {initialState} from "../store/initialState";


// --------------------------------------------- STORE LOGIC -------------------------------------------
export const saveSessionState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (error) {
    // Ignore write errors.
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

export const dataSeparate = (fileContent) => {
    const rows = fileContent.split("\n");
    let index = 0;
    let frameList = [];

    rows.forEach((row) => {
        const key = keyRecognize(row);

        if (key !== "unknown") {
            let object = {};
            object.index = index;
            object.key = key;
            object.isMarked = false;
            object.class = "default";
            object.colorClass = "default";
            object.filterItemList = [];
            object.data =  row.substring(key.length, row.length);
            frameList.push(object);
            index++;
        }  else {
            if(frameList.length > 0){
                frameList[frameList.length - 1].data += "\n" + row;
            }
        }
    });
    return frameList;
};

// ------------------------- FILTER LOGIC -----------------------------------------------
export const filterItemAddHandle = (filterList, filter) => {
    const hasDuplicity = filterList.some((f) => f.search(filter) > -1);
    if (hasDuplicity) return "duplicity";

    const tempList = filterList.filter((f) => filter.search(f) === -1);
    tempList.push(filter);
    return tempList;
};

export const filterItemRemoveHandle = (filterList, filter) => {

    return filterList.filter((f) => f !== filter);
};

export const filterItemAssign = (frameList, filter, filterList, isBound) => {

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
        frame.class = frame.filterItemList.length === 0 || (isBound && frame.filterItemList.length !== filterList.length) ? "hidden" : "default";
    });

    return [...frameList];
};

export const filterItemUnAssignHandle = (frameList, filter, filterList, isBound) => {

    let itemCount = 0;

    frameList.forEach((frame) => {
        if (frame.filterItemList.length > 0) {
            for (let i = 0; i < frame.filterItemList.length; i++) {
                if (frame.filterItemList[i].id === filter) {
                    frame.filterItemList.splice(i, 1);
                    break;
                }
            }
        }
        frame.class = frame.filterItemList.length === 0 || (isBound && frame.filterItemList.length !== filterList.length) ? "hidden" : "default";
        itemCount += frame.filterItemList.length;
    });

        itemCount === 0 && frameList.forEach((frame) => frame.class = "default");

    return [...frameList];
};


export const classByFilterListSet = (frameList, filterList, isBound) => {

    frameList.forEach((frame) => {
        frame.class = frame.filterItemList.length === 0 || (isBound && frame.filterItemList.length !== filterList.length) ? "hidden" : "default";
    });

    return [...frameList];
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






