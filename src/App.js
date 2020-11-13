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
    -- isMarked (Boolean)
    -- class (Array[String])
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
 */

export const App = (props) => {
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
  } = useBetween(useShareableState);

  const onClickHandler = (props) => {
    //console.log();
    //sessionStorage.clear();
    //let array = ["a", "b", "c"];
    alert(isMarkUpListExpanded);
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
