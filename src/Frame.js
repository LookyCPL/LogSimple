import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { getCssColorClass, markRowHandle , markUpListSetHandle } from "./methods";
import "./Frame.scss";

export const Frame = (props) => {
  const { colorIndex, setColorIndex, markUpList, setMarkUpList, frameList, setFrameList } = useBetween(useShareableState);

  const markHandle = (e, isMarked) => {
      let newMarkUpList = markUpListSetHandle(frameList, e.target.id, markUpList, !isMarked, colorIndex);
      sessionStorage.setItem("markUpList", JSON.stringify(newMarkUpList));
      setFrameList(markRowHandle(frameList, e.target.id, isMarked, colorIndex));
      setMarkUpList(newMarkUpList);

      if(isMarked){
          let newColorIndex = (colorIndex < 8 ?  colorIndex + 1 : 0);
          setColorIndex(newColorIndex);
          sessionStorage.setItem("colorIndex", newColorIndex);
      }
  };

  return (
    <div id={props.index + " - " + props.frKey} className={props.class}>
      <div className={props.isMarked ? "key marked " : "key"}>
        <button  className={props.colorClass} id={props.index} onClick={(e) => markHandle(e, !props.isMarked)}>
          {props.frKey}
        </button>
      </div>
      <div className="data">
        <label>{props.data}</label>
      </div>
    </div>
  );
};
