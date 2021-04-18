import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps} from "react-virtualized";
import "./Lobby.scss";
import "../App/App.scss";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import { setMarkUpStyleList } from "../../redux/actions/configActions";
import { Filter, FrameItem } from "../../types";
import { MarkUpList } from "../MarkUpList/MarkUpList";
import { Frame } from "../Frame/Frame";
import { markUpStyleList } from "../../utils/initialMarkUpListStyle";
import {
  markRowHandle,
  markUpListSetHandle,
  markUpStyleListHandle,
} from "../../utils/methods";
import { setFrameList } from "../../redux/actions/frameListActions";
import { setMarkUpList } from "../../redux/actions/markUpListActions";
import { selectMarkupList } from "../../redux/selectors/markUpListSelectors";

export const evaluateFrameVisibility = (
  isFilterBound: boolean,
  filterList: Filter[],
  frame: FrameItem
) => {
  const listByOnState = filterList.filter((f) => f.isFilterOn);

  if (listByOnState.length === 0) return true;
  if (listByOnState.length > 0 && frame.filterItemList.length === 0)
    return false;

  const filterKeys = listByOnState.map((f) => f.key);
  const matchCount = frame.filterItemList.filter(
    (fr) => filterKeys.indexOf(fr.id) > -1
  ).length;
  return (
    (isFilterBound && matchCount === listByOnState.length) ||
    (!isFilterBound && matchCount > 0)
  );
};

export const Lobby = () => {
  const dispatch = useDispatch();
  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const markUpList = useSelector(selectMarkupList);
  const { isFilterBound } = useSelector(selectConfig);
  const [scrollToIndex, setScrollToIndex] = useState<number>();
  const framesOnPlace = useMemo(
    () =>
      frameList.filter((frame) =>
        evaluateFrameVisibility(isFilterBound, filterList, frame)
      ),
    [isFilterBound, filterList, frameList]
  );
  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 40,
      defaultHeight: 100,
    })
  );

  const markHandle = (index: number, isMarked: boolean) => {
    if (
      (isMarked &&
        markUpStyleList.filter((item) => item === null).length !==
          markUpStyleList.length) ||
      !isMarked
    ) {
      let newMarkUpList = markUpListSetHandle(
        frameList,
        index,
        markUpList,
        !isMarked,
        markUpStyleList
      );
      const target = markUpList.filter((item) => item.index === index)[0];

      dispatch(
        setFrameList(markRowHandle(frameList, index, isMarked, markUpStyleList))
      );
      dispatch(setMarkUpList(newMarkUpList));
      dispatch(
        setMarkUpStyleList(
          markUpStyleListHandle(
            !isMarked,
            target.style.index,
            markUpStyleList,
            target.style
          )
        )
      );
    }
  };

  const renderRow = ({ index, parent, style }: ListRowProps) => {
    const frame = framesOnPlace[index];
    return (
      <CellMeasurer
        key={frame.key}
        cache={cache.current}
        parent={parent}
        columnIndex={0}
        rowIndex={frame.index}
      >
        <Frame
          style={style}
          frame={frame}
          onClick={() => markHandle(frame.index, !frame.isMarked)}
        />
      </CellMeasurer>
    );
  };

  const clickHandle = useCallback((index: number) => {
    setScrollToIndex(index);
    console.log(index);
  }, []);

   useEffect(() => {
     setScrollToIndex(undefined);
   }, [scrollToIndex]);

  return (
    <div className={"lobby"}>
      <MarkUpList onClick={clickHandle} />
      <div className={'lobby-content'}>
        <AutoSizer>
          {({ height, width }) => (
              <List
                  height={height}
                  width={width}
                  rowCount={framesOnPlace.length}
                  deferredMeasurementCache={cache.current}
                  rowHeight={cache.current.rowHeight}
                  rowRenderer={renderRow}
                  overscanRowCount={3}
                  scrollToAlignment={"start"}
                  scrollToIndex={scrollToIndex}
              />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
