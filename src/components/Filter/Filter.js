import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { filterItemAddHandle, filterItemAssign, filterItemRemoveHandle, filterItemUnAssignHandle, changeFilterStateHandle } from "../../utils/methods";
import { setFilterList } from "../../redux/actions/filterActions";
import "./Filter.scss";
import {setFilterBind} from "../../redux/actions/configActions";
import {setFrameList} from "../../redux/actions/frameListActions";
import {selectConfig} from "../../redux/selectors/configSelectors";
import {selectFilterList} from "../../redux/selectors/filterSelectors";
import {selectFrameList} from "../../redux/selectors/frameListSelectors";

export const Filter = () => {
  const dispatch = useDispatch();
  const filterList = useSelector(selectFilterList);
  const frameList = useSelector(selectFrameList);
  const isFilterBound = useSelector(selectConfig).isFilterBound;

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
    dispatch(setFilterBind(!isFilterBound));
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

