import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterItemAddHandle, filterItemAssign, filterItemRemoveHandle, filterItemUnAssignHandle, changeFilterStateHandle } from "../../utils/methods";
import { setFilterList } from "../../redux/actions/filterActions";
import { setFilterBind } from "../../redux/actions/configActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import "./Filter.scss";

export const Filter = () => {
  const dispatch = useDispatch();
  const filterList = useSelector(selectFilterList);
  const frameList = useSelector(selectFrameList);
  const { isFilterBound } = useSelector(selectConfig);

  const [inputFilter, setInputFilter] = useState('');

  const filterRemove = (key: string) => {
    dispatch(setFilterList(filterItemRemoveHandle(filterList, key)));
    dispatch(setFrameList(filterItemUnAssignHandle(frameList, key)));
  };

  const filterAdd = () => {
    if (inputFilter.replace(/ /g, "").length === 0) return;

    let newFilterState = filterItemAddHandle(filterList, inputFilter);

      if (newFilterState === "duplicity") {
        console.log("Duplicity!");
      } else {
        dispatch(setFilterList(newFilterState));
        dispatch(setFrameList(filterItemAssign(frameList, inputFilter)));
        setInputFilter('');
      }
  };

  const filterStateChange = (key: string) => {
    dispatch(setFilterList(changeFilterStateHandle(key, filterList)));
  };

  const filterBindHandle = () => {
    dispatch(setFilterBind(!isFilterBound));
  };

  return (
    <div className="filter">
      <div className="input">
        <input
          value={inputFilter}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputFilter(e.target.value)}
        />
        <button onClick={filterAdd} />
      </div>
      <div className="filterList">
        {filterList.map((filter) => (
          <div
            id={filter.key}
            onClick={() => filterStateChange(filter.key)}
            className={"filterItem " + (filter.isFilterOn ? "on" : "off")}
          >
            <div id={filter.key}>{filter.key}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                filterRemove(filter.key);
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

