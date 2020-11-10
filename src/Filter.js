import React, { useState } from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import {
  filterItemAddHandler,
  filterItemAssign,
  filterItemRemoveHandler,
  filterItemUnAssignHandler,
} from "./methods";
import "./Filter.scss";

export const Filter = (props) => {
  const {
    frameList,
    setFrameList,
    filterList,
    setFilterList,
    setRowCount,
  } = useBetween(useShareableState);
  const [inputFilter, setInputFilter] = useState(null);
  const filters = [];

  const RenderFilterItem = (filterValue, filterClass) => (
    <div className={filterClass}>
      <label>{filterValue}</label>
      <button
        onClick={filterRemove}
        id={filterValue}
        className={"removeItem"}
      />
    </div>
  );

  const filterRemove = (e) => {
    setFilterList(filterItemRemoveHandler(filterList, e.target.id));
    setFrameList(filterItemUnAssignHandler(frameList, e.target.id));
    setRowCount(
      frameList.class.filter((x) => {
        return x === "default";
      }).length
    );
  };

  const filterAdd = () => {
    if (inputFilter && inputFilter.replace(/ /g, "").length !== 0) {
      let newFilterState = filterItemAddHandler(filterList, inputFilter);

      if (newFilterState === "duplicity") {
        alert("Duplicity!");
      } else {
        setFilterList(newFilterState);
        setFrameList(filterItemAssign(frameList, inputFilter));
      }
    }
    setRowCount(
      frameList.class.filter((x) => {
        return x === "default";
      }).length
    );
    setInputFilter("");
  };

  if (filterList) {
    for (let w = 0; w < filterList.length; w++) {
      filters.push(RenderFilterItem(filterList[w], "filterItem"));
    }
  }

  return (
    <div className={"filter"}>
      <div className={"input"}>
        <div className={"inputContent"}>
          <input
            value={inputFilter}
            onInput={(e) => setInputFilter(e.target.value)}
          />
          <button onClick={filterAdd}>ADD</button>
        </div>
      </div>
      <div className={"filterList"}>{filters}</div>
    </div>
  );
};;
