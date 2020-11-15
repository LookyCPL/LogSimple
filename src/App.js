import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { Lobby } from "./Lobby.js";
import { Upload } from "./Upload.js";
import { Filter } from "./Filter";
import { MarkUpList } from "./MarkUpList.js";
import { Info } from "./Info.js";
import "./App.scss";
import moment from "moment";

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

export const App = (props) => {
  //sessionStorage.clear();
  const {
    frameList,
    setFrameList,
    filterList,
    setFilterList,
    fileName,
    setFileName,
    rowCount,
    setRowCount,
    isUploaded,
    setIsUploaded,
    isMarkUpListExpanded,
    setMarkUpListExpanded,
    markUpList,
    setMarkUpList
  } = useBetween(useShareableState);

  const onClickHandler = (props) => {
    //document.getElementById("2020-10-20 15:02:16,120").scrollIntoView();
    //document.getElementById("2020-10-20 15:02:16,120").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    //console.log("#" + (Math.random()*16777215).toString(16));
    //console.log(markUpList);
   //console.log(sessionStorage.getItem("colorIndex"));
    //sessionStorage.clear();
    //let array = ["a", "b", "c"];
    //alert(isMarkUpListExpanded);
    // setFilterList(["shit", "hovno"]);
    //console.log(Date.parse("2020-10-20 15:02:15.919"));
    //alert(moment("2020-02-20", "YYYY-MM-DD HH:mm:ss,SSS").isValid());
    //alert(dataSeparateGet("188jjj--231", ["greg"]));
  };

  return (
    <div className={"main"}>
      <div className={"header"}>
        <Upload />
        <Info />
      </div>
      <div className={"page"}>
        <MarkUpList isExpanded={isMarkUpListExpanded}/>
        <div className={"content"}>
          <div>
            <Lobby />
            <button onClick={onClickHandler}>test</button>
          </div>
        </div>
      </div>
      <Filter />
    </div>
  );
};
