import React, {useState} from 'react';


export const useShareableState = () => {

    let startObject = {
        class: ["default"],
        key: ["key1"],
        data: ["data1"],
        filterItemList: [[]],
    };

    const [frameList, setFrameList] = useState(startObject);
    const [filterList, setFilterList] = useState([]);

    return {
        frameList,
        setFrameList,
        filterList,
        setFilterList
    }
};
