import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Frame } from "./Frame/Frame";
import {
  generateFrameClass,
  markRowHandle,
  markUpListSetHandle,
  markUpStyleListHandle
} from "../utils/methods";
import "./App/App.scss";
import { selectConfig } from "../redux/selectors/configSelectors";
import { selectFilterList } from "../redux/selectors/filterSelectors";
import { selectFrameList } from "../redux/selectors/frameListSelectors";
import { setFrameList } from "../redux/actions/frameListActions";
import { setMarkUpList } from "../redux/actions/markUpListActions";
import { setMarkUpStyleList } from "../redux/actions/configActions";
import { selectMarkupList } from "../redux/selectors/markUpListSelectors";
import { markUpStyleList } from "../utils/initialMarkUpListStyle";

export const Lobby = () => {

  const dispatch = useDispatch();
  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const markUpList = useSelector(selectMarkupList);
  const { isFilterBound } = useSelector(selectConfig);

  const markHandle = (index: number, isMarked: boolean) => {

    if ((isMarked && markUpStyleList.filter((item) => (item === null)).length !== markUpStyleList.length) || !isMarked) {
      let newMarkUpList = markUpListSetHandle(frameList, index, markUpList, !isMarked, markUpStyleList);
      const target = markUpList.filter((item) => (item.index === index))[0];

      dispatch(setFrameList(markRowHandle(frameList, index, isMarked, markUpStyleList)));
      dispatch(setMarkUpList(newMarkUpList));
      dispatch(setMarkUpStyleList(markUpStyleListHandle(!isMarked, target.style.index, markUpStyleList, target.style)));
    }
  };

  return (
    <div>
      {frameList.map((frame, i) => (
        <Frame
            frame={frame}
            className={generateFrameClass(isFilterBound, filterList, frame)}
            onClick={() => markHandle(frame.index, !frame.isMarked)}
        />
      ))}
    </div>
  );
};
