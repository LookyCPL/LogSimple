import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterItemAddHandle, filterItemAssign, filterItemRemoveHandle, filterItemUnAssignHandle, classByFilterListSet } from "../utils/methods";
import { setFilterList, setFrameList, setFilterBound, setRowCount } from "../store/actions";
import "./Filter.scss";

export const Filter = () => {

    const dispatch = useDispatch();
    const filterList = useSelector(state => state.filterList);
    const frameList = useSelector(state => state.frameList);
    const isFilterBound = useSelector(state => state.generalConfig.isFilterBound);

  const [inputFilter, setInputFilter] = useState(null);

  const filterRemove = (e) => {
    let newFilterList = filterItemRemoveHandle(filterList, e.target.id);

    dispatch(setFilterList(newFilterList));
    dispatch(setFrameList(filterItemUnAssignHandle(frameList, e.target.id, newFilterList, isFilterBound)));
    dispatch(setRowCount(frameList.class.filter((x) => {return x === "default";}).length));
    };

  const filterAdd = () => {
    if (inputFilter && inputFilter.replace(/ /g, "").length !== 0) {
      let newFilterState = filterItemAddHandle(filterList, inputFilter);

      if (newFilterState === "duplicity") {
        alert("Duplicity!");
      } else {
          dispatch(setFilterList(newFilterState));
          dispatch(setFrameList(filterItemAssign(frameList, inputFilter, newFilterState, isFilterBound)));
          dispatch(setRowCount(frameList.class.filter((x) => {return x === "default";}).length));
      }
    }
      setInputFilter("");
  };

  const filterBindHandle = () => {
      dispatch(setFrameList(classByFilterListSet(frameList, filterList, !isFilterBound)));
      dispatch(setFilterBound(!isFilterBound));
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
