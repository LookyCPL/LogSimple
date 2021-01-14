import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { markRowHandle, markUpListSetHandle, markUpStyleListHandle } from "../../utils/methods";
import { setMarkUpStyleList } from "../../redux/actions/configActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { setMarkUpList } from "../../redux/actions/markUpListActions";
import "./Frame.scss";
import {selectConfig} from "../../redux/selectors/configSelectors";
import {selectFrameList} from "../../redux/selectors/frameListSelectors";
import {selectMarkupList} from "../../redux/selectors/markUpListSelectors";


export const Frame = (props) => {

    const dispatch = useDispatch();
    const frameList = useSelector(selectFrameList);
    const markUpList = useSelector(selectMarkupList);
    const markUpStyleList = useSelector(selectConfig).markUpStyleList;

    const markHandle = (e, isMarked) => {

        if ((isMarked && markUpStyleList.filter((item) => (item === null)).length !== markUpStyleList.length) || !isMarked) {
            let newMarkUpList = markUpListSetHandle(frameList, e.target.id, markUpList, !isMarked, markUpStyleList);
            const target = markUpList.filter((item) => (item.index === e.target.id))[0];

            dispatch(setFrameList(markRowHandle(frameList, e.target.id, isMarked, markUpStyleList)));
            dispatch(setMarkUpList(newMarkUpList));
            dispatch(setMarkUpStyleList(markUpStyleListHandle(!isMarked, target.style.index, markUpStyleList, target.style)));
        }
    };

    return (
        <div id={props.index + " - " + props.frKey} className={props.class}>
            <div className={props.isMarked ? "key marked " : "key"}>
                <button className={props.colorClass} key={props.frKey} id={props.index} onClick={(e) => markHandle(e, !props.isMarked)}>
                    {props.frKey}
                </button>
            </div>
            <div className="data">
                <span>{props.data}</span>
            </div>
        </div>
    );
};
