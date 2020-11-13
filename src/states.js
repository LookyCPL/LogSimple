import React, { useState } from "react";

export const useShareableState = () => {
    
    let initialObject = JSON.parse(sessionStorage.getItem("frameList")) || {
      class: ["hidden"],
      key: ["key1"],
      data: ["data1"],
      filterItemList: [[]],
    };
    let initialRowCount = initialObject.class.filter((x) => {
      return x === "default";
    }).length;

    const [frameList, setFrameList] = useState(initialObject);
    const [filterList, setFilterList] = useState(JSON.parse(sessionStorage.getItem("filterList")) || []);
    const [fileName, setFileName] = useState(sessionStorage.getItem("fileName") || "none");
    const [rowCount, setRowCount] = useState(initialRowCount);
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
  };
};

