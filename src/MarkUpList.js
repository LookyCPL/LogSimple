import React, {useState} from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { getCssColorClass } from "./methods";
import "./MarkUpList.scss";

export const MarkUpList = (props) => {
  const { frameList, markUpList, setMarkUpListExpanded } = useBetween(
    useShareableState
  );

  const [hoverId, setHoverId] = useState("hidden");

  const hoverVisibleHandle = (e) => {
      setHoverId(e.target.id);
  };

  const setExpand = () => {
    sessionStorage.setItem(
      "isMarkUpListExpanded",
      JSON.stringify(!props.isExpanded)
    );
    setMarkUpListExpanded(!props.isExpanded);
  };

  const markUpHandle = (e) => {
    const index = e.target.id;
    document
      .getElementById(index + " - " + frameList.key[index])
      .scrollIntoView();
  };

  return (
    <div className={"markUpList " + (props.isExpanded ? "expanded" : "")}>
      <div className={props.isExpanded ? "listContent" : "hidden"}>
        {markUpList.map((mark, i) => (
          <div>
            <button
              key={i}
              id={mark.index}
              className={mark.class}
              onClick={(e) => markUpHandle(e)}
              // onMouseEnter={(e) => hoverVisibleHandle(e)}
              // onMouseLeave={setHoverId("hidden")}
            >
              M
            </button>

          </div>
        ))}
      </div>
      <div>
        <button onClick={setExpand} className="btnExpand" />
      </div>
    </div>
  );
};
