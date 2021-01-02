import React from "react";
import { useSelector } from "react-redux";
import { Lobby } from "./Lobby.js";
import { Upload } from "./Upload.js";
import { Filter } from "./Filter";
import { MarkUpList } from "./MarkUpList.js";
import { Info } from "./Info.js";
import { Hover } from "./Hover";
import "./App.scss";


export const App = () => {
  const hoverStyle = useSelector((state) => state.hoverStyle);

  const onClickHandler = () => {
    // for testing
  };

  const clearSession = () => {
    sessionStorage.clear();
  };

  return (
    <div className={"main"}>
      <div className={"header"}>
        <Upload />
        <Info />
        <button onClick={clearSession}>CLEAR</button>
      </div>
      <div className={"page"}>
        <MarkUpList
          isExpanded={useSelector(
            (state) => state.generalConfig.isMarkUpListExpanded
          )}
        />
        <div className={"content"}>
          <div>
            <Lobby />
            <button onClick={onClickHandler}>test</button>
          </div>
        </div>
      </div>
      <Filter />
      <Hover
        style={hoverStyle.style}
        title={hoverStyle.title}
        class={hoverStyle.class}
      />
    </div>
  );
};
