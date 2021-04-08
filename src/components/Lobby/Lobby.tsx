import React, { useEffect, useRef, useState, useMemo, useCallback, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Lobby.scss";
import "../App/App.scss";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import {setLobbyConfig, setLobbySize as setLobbySizeAction} from "../../redux/actions/configActions";
import { Filter, FrameHeight, FrameItem, LobbySize } from "../../types";
import { averageCharLength } from "../../utils/valueList";
import { FrameListSlider } from "../FrameListSlider/FrameListSlider";
import { useCombinedRefs } from "../../utils/useCombinedRefs";

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
  height += Math.ceil(line/maxCharCountPerLine) * 18.4;
  });
    return height;
};

export const Lobby = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const lobbyRef = useRef(null);
  const combinedRef = useCombinedRefs(lobbyRef, ref);
  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const { isFilterBound, lobbyConfig } = useSelector(selectConfig);
  const { lobbyWidth, lobbyHeight } = lobbyConfig;
  const framesOnPlace = frameList.filter((frame) => evaluateFrameVisibility(isFilterBound, filterList, frame));
  const maxCharCountPerLine = Math.ceil(lobbyWidth / averageCharLength);
  const [scrollUpSize, setScrollUp] = useState(0);
console.log('hmm');
  const handleScroll = () => {
    if (combinedRef.current === null) return;
    // @ts-ignore
    // console.log(lobbyRef.current.scrollTop);
    // @ts-ignore
    setScrollUp(combinedRef.current.scrollTop);
  }

  const getLobbyConfig = useMemo(() => {
    console.log(framesOnPlace);
    const frameHeightList: FrameHeight[] = [];
    let totalHeight: number = 0;

    framesOnPlace.forEach((frame, i) => {
      const height = generateFrameHeight(
        frame.dataLengthList,
        maxCharCountPerLine
      );

      frameHeightList.push({
        index: frame.index,
        height: height,
        top: totalHeight,
        orderIndex: i,
      });
      totalHeight += height;
    });

    dispatch(
      setLobbyConfig({
        totalHeight: totalHeight,
        lobbyHeight: lobbyHeight,
        lobbyWidth: lobbyWidth,
        frameHeightList: frameHeightList,
        topFrame: frameHeightList[0]
      })
    );
  },[framesOnPlace]);

  const setLobbySize = useEffect(() => {
    const content = document.getElementById("lobby");
    if (content) {
      const lobbySize: LobbySize = {
        height: Math.ceil(content.getBoundingClientRect().height),
        width: Math.ceil(content.getBoundingClientRect().width - 60),
      };
      dispatch(setLobbySizeAction(lobbySize));
    }
  }, []);

  return (
    <div
      id={"lobby"}
      className={"lobby"}
      ref={combinedRef}
      onScrollCapture={handleScroll}
    >
      {framesOnPlace.length > 0 && <FrameListSlider
          scrollUpSize={scrollUpSize}
          framesOnPlace={framesOnPlace}
      />}
    </div>
  );
});
