import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { markRowHandle, markUpListSetHandle } from "./methods";
import { setFrameList, setColorIndex, setLetterIndex, setMarkUpList } from "../store/actions";
import "./Frame.scss";

export const Frame = (props) => {

    const dispatch = useDispatch();
    const frameList = useSelector(state => state.frameList);
    const markUpList = useSelector(state => state.markUpList);
    const colorIndex = useSelector(state => state.generalConfig.colorIndex);
    const letterIndex = useSelector(state => state.generalConfig.letterIndex);

    const markHandle = (e, isMarked) => {
        let newMarkUpList = markUpListSetHandle(frameList, e.target.id, markUpList, !isMarked, colorIndex, letterIndex);

        dispatch(setFrameList(markRowHandle(frameList, e.target.id, isMarked, colorIndex)));
        dispatch(setMarkUpList(newMarkUpList));

        if (isMarked) {
            let newColorIndex = (colorIndex < 8 ? colorIndex + 1 : 0);
            let newSignIndex = (letterIndex < 24 ? letterIndex + 1 : 0);
            dispatch(setLetterIndex(newSignIndex));
            dispatch(setColorIndex(newColorIndex));
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
