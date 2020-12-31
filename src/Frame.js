import React from "react";
import {useBetween} from "use-between";
import {useShareableState} from "./states";
import {getCssColorClass, markRowHandle, markUpListSetHandle} from "./methods";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Frame.scss";
import {setFrameList} from "./actions";

export const Frame = (props) => {
    const {
      setSignIndex,
      signIndex,
      colorIndex,
      setColorIndex,
      markUpList,
      setMarkUpList,
    } = useBetween(useShareableState);

    const dispatch = useDispatch();
    const frameList = useSelector(state => state.frameList);

    const markHandle = (e, isMarked) => {
        let newMarkUpList = markUpListSetHandle(frameList, e.target.id, markUpList, !isMarked, colorIndex, signIndex);
        sessionStorage.setItem("markUpList", JSON.stringify(newMarkUpList));
        dispatch(setFrameList(markRowHandle(frameList, e.target.id, isMarked, colorIndex)));
        setMarkUpList(newMarkUpList);

        if (isMarked) {
            let newColorIndex = (colorIndex < 8 ? colorIndex + 1 : 0);
            let newSignIndex = (signIndex < 24 ? signIndex + 1 : 0);
            setSignIndex(newSignIndex);
            setColorIndex(newColorIndex);
            sessionStorage.setItem("colorIndex", newColorIndex);
            sessionStorage.setItem("signIndex", newSignIndex);
        }
    };

    return (
        <div id={props.index + " - " + props.frKey} className={props.class}>
            <div className={props.isMarked ? "key marked " : "key"}>
                <button className={props.colorClass} id={props.index} onClick={(e) => markHandle(e, !props.isMarked)}>
                    {props.frKey}
                </button>
            </div>
            <div className="data">
                <label>{props.data}</label>
            </div>
        </div>
    );
};
