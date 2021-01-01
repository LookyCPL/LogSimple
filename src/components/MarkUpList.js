import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMarkUpListExpanded } from "../store/actions";
import "./MarkUpList.scss";

export const MarkUpList = (props) => {
  const dispatch = useDispatch();
  const frameList = useSelector((state) => state.frameList);
  const markUpList = useSelector((state) => state.markUpList);

  // const [hoverId, setHoverId] = useState("hidden");
  // const hoverVisibleHandle = (e) => {
  //     setHoverId(e.target.id);
  // };

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
              className={mark.style.class}
              onClick={(e) => markUpHandle(e)}
              // onMouseEnter={(e) => hoverVisibleHandle(e)}
              // onMouseLeave={setHoverId("hidden")}
            >
              {mark.style.letter}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => dispatch(setMarkUpListExpanded())}
          className="btnExpand"
        />
      </div>
    </div>
  );
};
