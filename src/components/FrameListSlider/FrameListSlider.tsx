import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markUpStyleList } from "../../utils/initialMarkUpListStyle";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import { Frame } from "../Frame/Frame";
import { selectMarkupList } from "../../redux/selectors/markUpListSelectors";
import { markRowHandle, markUpListSetHandle, markUpStyleListHandle } from "../../utils/methods";
import { setFrameList } from "../../redux/actions/frameListActions";
import { setMarkUpStyleList, setTopFrame } from "../../redux/actions/configActions";
import { setMarkUpList } from "../../redux/actions/markUpListActions";
import { FrameItem } from "../../types";
import { selectConfig } from "../../redux/selectors/configSelectors";

export interface FrameListSliderProps {
    scrollUpSize: number
    framesOnPlace: FrameItem[]
}

const getStyle = (height: number, top: number) => {
    return {
        height: height,
        top: top,
    }
};

export const FrameListSlider = (props: FrameListSliderProps) => {
    const { scrollUpSize, framesOnPlace } = props;
    const dispatch = useDispatch();
    const frameList = useSelector(selectFrameList);
    const markUpList = useSelector(selectMarkupList);
    const { lobbyConfig } = useSelector(selectConfig);
    const { lobbyHeight, totalHeight, frameHeightList, topFrame } = lobbyConfig;

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

    const handleTopFrameChange = useEffect(() => {
            if (topFrame.top + topFrame.height <= scrollUpSize && topFrame.orderIndex < frameHeightList.length - 1) {
                dispatch(setTopFrame(frameHeightList[topFrame.orderIndex + 1]));
            } else if (topFrame.top > scrollUpSize && topFrame.orderIndex !== 0) {
                dispatch(setTopFrame(frameHeightList[topFrame.orderIndex - 1]));
            }
    }, [scrollUpSize]);


    const MakeSliderContent = useMemo(() => {
      let counter: number = 0;
      let end: number = 0;

      counter = topFrame.height + topFrame.top - scrollUpSize;

      for (let g = topFrame.orderIndex + 1; g < frameHeightList.length; g++) {
        counter += frameHeightList[g].height;

        if (counter >= lobbyHeight + topFrame.height) {
          end = g;
          break;
        } else {
          end = frameHeightList.length - 1;
        }
      }
      return (
        <div className={"slider"} style={getStyle(totalHeight, 0)}>
          {framesOnPlace.slice(topFrame.orderIndex, end + 1).map((frame) => {
            const framePars = frameHeightList.find(
              (i) => i.index === frame.index
            );
            return (
              <Frame
                // @ts-ignore
                style={getStyle(framePars.height, framePars.top)}
                frame={frame}
                onClick={() => markHandle(frame.index, !frame.isMarked)}
              />
            );
          })}
        </div>
      );
    }, [topFrame]);

    return (
        <div>{MakeSliderContent}</div>
    );
}