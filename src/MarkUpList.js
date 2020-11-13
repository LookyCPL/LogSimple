import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import "./MarkUpList.scss";

export const MarkUpList = (props) => {
  const { setMarkUpListExpanded } = useBetween(useShareableState);

  const setExpand = () => {
    setMarkUpListExpanded(!props.isExpanded);
  };

  return (
    <div className={"markUpList " + (props.isExpanded ? "expanded" : "")}>
      <div className={props.isExpanded ? "listContent" : "hidden"}/>
      <div>
        <button onClick={setExpand} className="btnExpand" />
      </div>
    </div>
  );
};
