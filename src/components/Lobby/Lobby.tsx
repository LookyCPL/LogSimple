import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Lobby.scss";
import "../App/App.scss";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import { setLobbyHeight, setLobbyWidth } from "../../redux/actions/configActions";
import { Filter, FrameHeight, FrameItem } from "../../types";
import { averageCharLength } from "../../utils/valueList";
import { FrameListSlider } from "../FrameListSlider/FrameListSlider";

export const evaluateFrameVisibility = (isFilterBound: boolean, filterList: Filter[], frame: FrameItem) => {
  const listByOnState = filterList.filter((f) => f.isFilterOn);

  if (listByOnState.length === 0) return true;
  if (listByOnState.length > 0 && frame.filterItemList.length === 0) return false;

  const filterKeys = listByOnState.map((f) => f.key);
  const matchCount = frame.filterItemList.filter((fr) => filterKeys.indexOf(fr.id) > -1).length;
  return isFilterBound && matchCount === listByOnState.length || !isFilterBound && matchCount > 0;
};

const generateFrameHeight = (dataLengthList: number[], maxCharCountPerLine: number) => {

  let height = 40.0;

  dataLengthList.forEach((line) => {
  height += Math.ceil(line/maxCharCountPerLine) * 18;
  });

    return height;
};


export const Lobby = () => {
  const dispatch = useDispatch();
  const lobbyRef = useRef(null);
  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const { isFilterBound, lobbyWidth, lobbyHeight } = useSelector(selectConfig);
  const framesOnPlace = frameList.filter((frame) => evaluateFrameVisibility(isFilterBound, filterList, frame));
  const maxCharCountPerLine = Math.ceil(lobbyWidth / averageCharLength);
  const [scrollUpSize, setScrollUp] = useState(0);

  const handleScroll = () => {
    if (lobbyRef.current === null) return;
    // @ts-ignore
    // console.log(lobbyRef.current.scrollTop);
    // @ts-ignore
    setScrollUp(lobbyRef.current.scrollTop);
  }

  const getLobbyConfig = useCallback(() => {

    const frameHeightList: FrameHeight[] = [];
    let totalHeight: number = 0;

    framesOnPlace.forEach((frame, i) => {
      const height = generateFrameHeight(frame.dataLengthList, maxCharCountPerLine);

      frameHeightList.push(
          {
            index: frame.index,
            height: height,
            top: totalHeight,
            orderIndex: i,
          }
      )
      totalHeight += height;
    });

    return {
      totalHeight: totalHeight,
      lobbyHeight: lobbyHeight,
      frameHeightList: frameHeightList
    };
  },[framesOnPlace]);


  const setLobbySize = useEffect(() => {
    const content = document.getElementById("lobby");
    if (content) {
      dispatch(setLobbyWidth(Math.ceil(content.getBoundingClientRect().width - 60)));
      dispatch(setLobbyHeight(Math.ceil(content.getBoundingClientRect().height)));
    }
  }, []);

  return (
    <div
      id={"lobby"}
      className={"lobby"}
      ref={lobbyRef}
      onScrollCapture={handleScroll}
    >
      <FrameListSlider
          scrollUpSize={scrollUpSize}
          lobbyConfig={getLobbyConfig()}
          framesOnPlace={framesOnPlace}
      />
    </div>
  );
};
