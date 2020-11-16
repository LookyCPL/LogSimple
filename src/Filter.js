import React, { useState } from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import {
  filterItemAddHandle,
  filterItemAssign,
  filterItemRemoveHandle,
  filterItemUnAssignHandle,
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

  const filterRemove = (e) => {
    setFilterList(filterItemRemoveHandle(filterList, e.target.id));
    setFrameList(filterItemUnAssignHandle(frameList, e.target.id));
    setRowCount(
      frameList.class.filter((x) => {
        return x === "default";
      }).length
    );
  };

  const filterAdd = () => {
    if (inputFilter && inputFilter.replace(/ /g, "").length !== 0) {
      let newFilterState = filterItemAddHandle(filterList, inputFilter);

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

  return (
    <div className={"filter"}>
      <div className={"input"}>
          <input
            value={inputFilter}
            onInput={(e) => setInputFilter(e.target.value)}
          />
          <button onClick={filterAdd}/>
      </div>
      <div className={"filterList"}>
        {filterList.map((filter, i) => (
          <div className="filterItem">
            <label>{filterList[i]}</label>
            <button
              onClick={filterRemove}
              id={filterList[i]}
              className={"removeItem"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
