import {initialState} from "../store/initialState";

// --------------------------------------------- UPLOAD LOGIC -------------------------------------------

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

    let indexList = [];
    let dataList = [];
    let separatorCount = 0;
    let rowCount = 0;

    rows.forEach((row) => {

        const keyListOnSeparator = keyList[separatorCount];
        let index = row.search(keyListOnSeparator);

        if (index === 0) {
            dataList.push(row.substring(keyListOnSeparator.length, row.length));
            indexList.push(separatorCount);
            if (separatorCount < keyList.length - 1) separatorCount++;
            rowCount++;
        } else if (index > 0) {
            dataList.push(row.substring(0, index) + row.substring(index + keyListOnSeparator.length, row.length));
            indexList.push(separatorCount);
            if (separatorCount < keyList.length - 1) separatorCount++;
            rowCount++;
        } else {
            dataList[dataList.length - 1] += "\n" + row;
        }
    });

    return {
        index: indexList,
        isMarked: Array(keyList.length).fill(false),
        key: keyList,
        data: dataList,
        class: Array(keyList.length).fill("default"),
        colorClass: Array(keyList.length).fill("default"),
        filterItemList: Array(keyList.length).fill([]),
    };
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

export const filterItemAssign = (object, filter, filterList, isBound) => {
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
        }

        if (object.filterItemList[r].length === 0 || (isBound && object.filterItemList[r].length !== filterList.length)) {
            tempClassList.push("hidden");
        } else {
            tempClassList.push("default");
        }
    }

    object.class = tempClassList;
    sessionStorage.setItem("frameList", JSON.stringify(object));
    return {...object};
};

export const filterItemUnAssignHandle = (object, filter, filterList, isBound) => {
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

        if (object.filterItemList[w].length === 0 || (isBound && object.filterItemList[w].length !== filterList.length)) {
            tempClassList.push("hidden");
        } else {
            tempClassList.push("default");
        }
    }
    if (object.filterItemList.flat().length === 0) {
        tempClassList.fill("default", 0, tempClassList.length);
    }
    object.class = tempClassList;
    sessionStorage.setItem("frameList", JSON.stringify(object));
    return {...object};
};


export const classByFilterListSet = (object, filterList, isBound) => {
    let tempClassList = [];
    let filterItemListList = object.filterItemList;

    for (let i = 0; i < filterItemListList.length; i++) {
        if (object.filterItemList[i].length === 0 || (isBound && object.filterItemList[i].length !== filterList.length)) {
            tempClassList.push("hidden");
        } else {
            tempClassList.push("default");
        }
    }

    object.class = tempClassList;
    return {...object};
};

// ------------------------- MARK UP LIST LOGIC -----------------------------------------------


export const markUpListSetHandle = (object, index, markUpList, isMarked, styleList) => {

    const style = styleList.filter((i) => (i !== null))[0];

    if (!isMarked) {
        markUpList.push({
            index: index,
            key: object.key[index],
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

export const markRowHandle = (object, index, isMarked, styleList) => {

    let newClass;

    if (isMarked) {
        for (let i = 0; i < styleList.length; i++) {
            if (styleList[i] !== null) {
                newClass = styleList[i].class;
                break;
            }
        }
    }
    object.isMarked[index] = isMarked;
    object.colorClass[index] = (isMarked ? newClass : "default");
    return {...object};
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





