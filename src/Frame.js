import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { markRowHandle } from "./methods";
import "./Frame.scss";

export const Frame = (props) => {
  const { frameList, setFrameList } = useBetween(useShareableState);

  const markHandle = (e, isMarked) => {
    setFrameList(markRowHandle(frameList, e.target.id, isMarked));
  };

  return (
    <div className={props.class}>
      <div>
        <button className={"hidden"} id={props.index}>
          {props.index}
        </button>
      </div>
      <div className={props.isMarked ? "key marked" : "key"}>
        <button id={props.index} onClick={(e) => markHandle(e, !props.isMarked)}>
          {props.frKey}
        </button>
      </div>
      <div className="data">
        <label>{props.data}</label>
      </div>
    </div>
  );
};
