import React from "react";
import { Frame } from "./Frame";
import { filterIndexListMerge } from "./methods";
import { useSelector } from "react-redux";
import "./App.scss";

export const Lobby = (props) => {

  const frameList = useSelector(state => state.frameList);
  let classList = frameList.class.slice();
  let colorClassList = frameList.colorClass.slice();
  let keyList = frameList.key.slice();
  let dataList = frameList.data.slice();
  let filterItemList = frameList.filterItemList.slice();
  let isMarked = frameList.isMarked.slice();

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
      {keyList.map((key, i) => (
        <Frame
          isMarked={isMarked[i]}
          index={i}
          key={i}
          class={classList[i]}
          colorClass={colorClassList[i]}
          frKey={key}
          data={prepareData(filterItemList[i], dataList[i])}
          filterItemList={filterItemList[i]}
        />
      ))}
    </div>
  );
};
