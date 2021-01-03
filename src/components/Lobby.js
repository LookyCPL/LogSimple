import React from "react";
import { useSelector } from "react-redux";
import { Frame } from "./Frame";
import { filterIndexListMerge } from "../utils/methods";
import "./App.scss";

export const Lobby = () => {

  const frameList = useSelector(state => state.frameList);

  const prepareData = (filterItemList, data) => {
    if (!data || !filterItemList) return data;
    if (filterItemList.length === 0) return data;

    let temp = [];
    let endSubstring = data;
    let indexShift = 0;

    const indexList = filterIndexListMerge(filterItemList);

    indexList.forEach((indexes) => {
      temp.push(
        endSubstring.substring(0, indexes.start - indexShift),
        <span className="filterItemSubstring">
          {endSubstring.substring(
            indexes.start - indexShift,
            indexes.end - indexShift
          )}
        </span>
      );
      endSubstring = endSubstring.substring(
        indexes.end - indexShift,
        endSubstring.length
      );
      indexShift = indexes.end;
    });
    temp.push(endSubstring);
    return temp;
  };

  return (
    <div>
      {frameList.map((frame, i) => (
        <Frame
          isMarked={frame.isMarked}
          index={i}
          key={i}
          class={frame.class}
          colorClass={frame.colorClass}
          frKey={frame.key}
          data={prepareData(frame.filterItemList, frame.data)}
          filterItemList={frame.filterItemList}
        />
      ))}
    </div>
  );
};
