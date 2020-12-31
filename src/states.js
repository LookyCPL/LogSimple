import React, { useState } from "react";

/*
Data structure:

-- frameList (Object)
    -- index (Array[Integer])
    -- isMarked (Array[Boolean])
    -- class (Array[String])
    -- colorClass (Array[String])
    -- key (Array[String])
    -- data (Array[String])
    -- filterItemList (Array[Object])
        -- id (String)
        -- caseSens (Boolean)
        -- matchWord (Boolean)
        -- indexList (Array[Object])
            -- id (String)
            -- start (Integer)
            -- end (Integer)

-- filterList (Array[String])

-- markUpList(Array[Object])
  -- key (String)
  -- class (String)
  -- index (Integer)
*/

export const useShareableState = () => {

    let initialObject = JSON.parse(sessionStorage.getItem("frameList")) || {
      isMarked: [false],
      colorClass: ["default"],
      class: ["hidden"],
      key: ["key1"],
      data: ["data1"],
      filterItemList: [[]],
    };
    let initialRowCount = initialObject.class.filter((x) => {
      return x === "default";
    }).length;

    const [isFilterBound, setFilterBound] = useState(JSON.parse(sessionStorage.getItem("isFilterBound")) || false);
    const [fileName, setFileName] = useState(sessionStorage.getItem("fileName") || "none");
    const [rowCount, setRowCount] = useState(initialRowCount);
    const [isUploaded, setIsUploaded] = useState(false);
    const [markUpList, setMarkUpList] = useState(JSON.parse(sessionStorage.getItem("markUpList")) || []);
    const [isMarkUpListExpanded, setMarkUpListExpanded] = useState(JSON.parse(sessionStorage.getItem("isMarkUpListExpanded")) || false);
    const [colorIndex, setColorIndex] = useState(parseInt(sessionStorage.getItem("colorIndex")) || 0);
    const [signIndex, setSignIndex] = useState(parseInt(sessionStorage.getItem("signIndex")) || 0);

    return {
        isFilterBound,
        setFilterBound,
        fileName,
        setFileName,
        rowCount,
        setRowCount,
        isUploaded,
        setIsUploaded,
        isMarkUpListExpanded,
        setMarkUpListExpanded,
        markUpList,
        setMarkUpList,
        colorIndex,
        setColorIndex,
        signIndex,
        setSignIndex
    };
};

