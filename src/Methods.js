import moment from 'moment'
import React from 'react';

// --------------------------------------------- UPLOAD LOGIC -------------------------------------------
export const dateTypeRecognizer = (object, inputText) => {

    const dateFormatType = "YYYY-MM-DD HH:mm:ss,SSS";
    let keyList = [];
    let classList = [];
    let filterItemList = [[]];
    let rows = inputText.split('\n');
    let isDate;

    for (const row of rows) {

        let itemList = [];
        isDate = moment(row.substring(0, dateFormatType.length), dateFormatType, true).isValid();

        if (isDate) {
            keyList.push(row.substring(0, dateFormatType.length));
        }

        filterItemList.push(itemList);
        classList.push("default");
    }

    object.filterItemList = filterItemList;
    object.class = classList;
    object.key = keyList;
    return {...object};
};

export const dataSeparateGet = (object, inputText, separators) => {

    let dataList = [];
    let rows = inputText.split('\n');
    let separatorCount = 0;
    let rowCount = 0;

    for (const row of rows) {

        let index = row.search(separators[separatorCount]);

        if (index === 0) {

            dataList.push((row.substring(separators[separatorCount].length, row.length)));
            if (separatorCount < separators.length - 1) {
                separatorCount++;
            }
            rowCount++;
        } else if (index > 0) {

            dataList.push(row.substring(0, index) + row.substring((index + separators[separatorCount].length), row.length));
            if (separatorCount < separators.length - 1) {
                separatorCount++;
            }
            rowCount++;
        } else {

            dataList.splice(rowCount - 1, rowCount - 1, dataList[rowCount - 1] + '\n' + row);
        }
    }
    object.data = dataList;
    return {...object};
};
/*
export const bodyFormatter = (map, dataList) => {

    const domParser = new DOMParser();
    let bodyList = [];
    let bodyClassList = [];

    for (let r = 0; r < dataList.length; r++) {

        bodyList.push(domParser.parseFromString(dataList[r], "text/xml"));
        bodyClassList.push("body");

    }
    map.set("bodyClass", bodyClassList);
    map.set("body", bodyList);
    return new Map([...map]);
};
*/

// ------------------------- FILTER LOGIC -----------------------------------------------
export const filterItemAddHandler = (filterList, filter) => {

    //duplicity check
    for (let g = 0; g < filterList.length; g++) {

        if (filterList[g].search(filter) > -1) {
            return "duplicity";
        }
    }
    let tempList = [];

    //sub-duplicity check
    for (let g = 0; g < filterList.length; g++) {

        if (filter.search(filterList[g]) === -1) {
            tempList.push(filterList[g]);
        }
    }
    tempList.push(filter);
    return tempList;
};


export const filterItemRemoveHandler = (filterList, filter) => {

    for (let g = 0; g < filterList.length; g++) {

        if (filterList[g] === filter) {
            filterList.splice(g, 1);
        }
    }
    return new Array(...filterList);
};

export const filterItemAssign = (object, filter) => {

    let dataList = object.data;
    let tempClassList = [];

    for (let r = 0; r < dataList.length; r++) {

        // delete sub-duplicities throw all filter items
        if (object.filterItemList[r].length > 0) {

            let tempFilterItemList = [];

            for (const tempFilterItem of object.filterItemList[r]) {

                if (filter.search(tempFilterItem.id) === -1) {
                    tempFilterItemList.push(tempFilterItem);
                }
            }
            object.filterItemList[r] = tempFilterItemList;
        }

        // check if new filter is match in data
        if (dataList[r].search(filter) > -1) {

            let matches = dataList[r].matchAll(RegExp(filter, 'g'));
            let subIndexList = [];

            for (const match of matches) {
                subIndexList.push({
                    id: match.index,
                    start: match.index,
                    end: match.index + match[0].length
                });
            }

            let filterItem = {
                id: filter,
                caseSens: false,
                matchWord: false,
                indexList: subIndexList
            };

            object.filterItemList[r].push(filterItem);
            tempClassList.push("default");
        }
        else {
            tempClassList.push("hidden");
        }
    }

    object.class = tempClassList;
    return {...object};
};

export const filterItemUnAssignHandler = (object, filter) => {

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

        tempClassList.fill("default", 0, object.filterItemList.length);
    }
    object.class = tempClassList;
    return {...object};
};


// ------------------------- USAGE LOGIC -----------------------------------------------


export const filterIndexListMerge = (filterItemList) => {

    let tempIndexList = [];

    for (const filterItem of filterItemList) {

        tempIndexList = [...tempIndexList, ...filterItem.indexList];
    }

    let swapped = true;
    let counter = 0;
    let tempValue;

    while (swapped) {
        swapped = false;
        counter++;
        for (let i = 0; i < tempIndexList.length - counter; i++) {
            if (tempIndexList[i].id > tempIndexList[i + 1].id) {
                tempValue = tempIndexList[i];
                tempIndexList[i] = tempIndexList[i + 1];
                tempIndexList[i + 1] = tempValue;
                swapped = true;
            }
        }
    }
    return tempIndexList;
};


const generateTag = () => {
    return (
        <b>Hello</b>
    )
};