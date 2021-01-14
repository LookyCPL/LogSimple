import React from "react";
import { useSelector } from "react-redux";
import { Frame } from "./Frame/Frame";
import {filterIndexListMerge, generateFrameClass} from "../utils/methods";
import "./App/App.scss";
import {selectConfig} from "../redux/selectors/configSelectors";
import {selectFilterList} from "../redux/selectors/filterSelectors";
import {selectFrameList} from "../redux/selectors/frameListSelectors";

export const Lobby = () => {

  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const isFilterBound = useSelector(selectConfig).isFilterBound;

  const prepareData = (filterItemList, data) => {
    if (!data || !filterItemList) return data;
    if (filterItemList.length === 0) return data;

    let temp = [];
    let endSubstring = data;
    let indexShift = 0;

    filterList.filter((f) => f.isFilterOn);
    const filterKeys = filterList.filter((f) => f.isFilterOn).map((f) => f.key);
    const indexList = filterIndexListMerge(filterItemList.filter((item) => filterKeys.indexOf(item.id) > -1));

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
          class={generateFrameClass(isFilterBound, filterList, frame)}
          colorClass={frame.colorClass}
          frKey={frame.key}
          data={prepareData(frame.filterItemList, frame.data)}
          filterItemList={frame.filterItemList}
        />
      ))}
    </div>
  );
};
