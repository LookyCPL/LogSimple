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
    const [fileName, setFileName] = useState("someFile.txt");
    const [rowCount, setRowCount] = useState(10);
    const [isUploaded, setIsUploaded] = useState(false);

    return {
        frameList,
        setFrameList,
        filterList,
        setFilterList,
        fileName,
        setFileName,
        rowCount,
        setRowCount,
        isUploaded,
        setIsUploaded
    }
};
