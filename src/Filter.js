import React, { useState } from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import {
  filterItemAddHandle,
  filterItemAssign,
  filterItemRemoveHandle,
  filterItemUnAssignHandle,
  classByFilterListSet,
} from "./methods";
import "./Filter.scss";

export const Filter = (props) => {
  const {
    frameList,
    setFrameList,
    filterList,
    setFilterList,
    setRowCount,
    isFilterBound,
    setFilterBound,
  } = useBetween(useShareableState);
  const [inputFilter, setInputFilter] = useState(null);

  const filterRemove = (e) => {
    let newFilterList = filterItemRemoveHandle(filterList, e.target.id);

    setFilterList(newFilterList);
    setFrameList(
      filterItemUnAssignHandle(
        frameList,
        e.target.id,
        newFilterList,
        isFilterBound
      )
    );
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
        setFrameList(
          filterItemAssign(
            frameList,
            inputFilter,
            newFilterState,
            isFilterBound
          )
        );
      }
    }
    setRowCount(
      frameList.class.filter((x) => {
        return x === "default";
      }).length
    );
    setInputFilter("");
  };

  const filterBindHandle = () => {
      classByFilterListSet(frameList, filterList, !isFilterBound);
      setFilterBound(!isFilterBound);
      sessionStorage.setItem("fileName", JSON.stringify(!isFilterBound));
  };

  return (
    <div className="filter">
      <div className="input">
        <input
          value={inputFilter}
          onInput={(e) => setInputFilter(e.target.value)}
        />
        <button onClick={filterAdd} />
      </div>
      <div className="filterList">
        {filterList.map((filter, i) => (
          <div className="filterItem">
            <label>{filterList[i]}</label>
            <button
              onClick={filterRemove}
              id={filterList[i]}
              className="removeItem"
            />
          </div>
        ))}
      </div>
      <div
        className={isFilterBound ? "binder bound" : "binder"}
        onClick={filterBindHandle}
      >
        <button />
      </div>
    </div>
  );
};
