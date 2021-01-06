import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterItemAddHandle, filterItemAssign, filterItemRemoveHandle, filterItemUnAssignHandle, changeFilterStateHandle } from "../../utils/methods";
import { setFilterList, setFrameList, setFilterBound } from "../../store/actions";
import "./Filter.scss";

export const Filter = () => {
  const dispatch = useDispatch();
  const filterList = useSelector((state) => state.filterList);
  const frameList = useSelector((state) => state.frameList);
  const isFilterBound = useSelector(
    (state) => state.generalConfig.isFilterBound
  );

  const [inputFilter, setInputFilter] = useState(null);

  const filterRemove = (e) => {
    dispatch(setFilterList(filterItemRemoveHandle(filterList, e.target.id)));
    dispatch(setFrameList(filterItemUnAssignHandle(frameList, e.target.id)));
  };

  const filterAdd = () => {
    if (inputFilter && inputFilter.replace(/ /g, "").length !== 0) {
      let newFilterState = filterItemAddHandle(filterList, inputFilter);

      if (newFilterState === "duplicity") {
        alert("Duplicity!");
      } else {
        dispatch(setFilterList(newFilterState));
        dispatch(setFrameList(filterItemAssign(frameList, inputFilter)));
      }
    }
    setInputFilter("");
  };

  const filterStatechange = (e) => {
    dispatch(setFilterList(changeFilterStateHandle(e.target.id, filterList)));
  };

  const filterBindHandle = () => {
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
        {filterList.map((filter) => (
          <div
            id={filter.key}
            onClick={filterStatechange}
            className={"filterItem " + (filter.isFilterOn ? "on" : "off")}
          >
            <div id={filter.key}>{filter.key}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                filterRemove(e);
              }}
              id={filter.key}
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

