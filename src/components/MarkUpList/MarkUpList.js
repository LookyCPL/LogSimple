import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { generateFrameClass, generateHoverStyle } from "../../utils/methods";
import "./MarkUpList.scss";
import {setMarkUpListExpanded} from "../../redux/actions/configActions";
import {setHover} from "../../redux/actions/hoverActions";
import {selectConfig} from "../../redux/selectors/configSelectors";
import {selectFilterList} from "../../redux/selectors/filterSelectors";
import {selectFrameList} from "../../redux/selectors/frameListSelectors";
import {selectMarkupList} from "../../redux/selectors/markUpListSelectors";


export const MarkUpList = (props) => {
    const dispatch = useDispatch();
    const frameList = useSelector(selectFrameList);
    const filterList = useSelector(selectFilterList);
    const markUpList = useSelector(selectMarkupList);
    const isFilterBound = useSelector(selectConfig).isFilterBound;

    const hoverHandle = (isReset, index, className) => {
        dispatch(setHover(isReset ? {isReset: isReset} : generateHoverStyle(frameList[index].key, className, document.getElementById("markUp-" + index).getBoundingClientRect(), "MARK_UP")));
    };

    const calculateCssClass = (cssClass, index) => {
        const frameClass = generateFrameClass(isFilterBound, filterList, frameList[index]);
        return frameClass === "hidden" ? cssClass + " disabled" : cssClass;
    };

    const markUpHandle = (e) => {
        const index = e.target.id;
        document
            .getElementById(index + " - " + frameList[index].key)
            .scrollIntoView();
    };

    return (
        <div className={"markUpList " + (props.isExpanded ? "expanded" : "")}>
            <div className={props.isExpanded ? "listContent" : "hidden"}>
                {markUpList.map((mark, i) => (
                    <div id={"markUp-" + mark.index}>
                        <button
                            key={i}
                            id={mark.index}
                            className={calculateCssClass(mark.style.class, mark.index)}
                            onClick={(e) => markUpHandle(e)}
                            onMouseEnter={(e) => hoverHandle(false, mark.index, calculateCssClass(mark.style.class, mark.index))}
                            onMouseLeave={(e) => hoverHandle(true)}
                        >
                            {mark.style.letter}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={() => dispatch(setMarkUpListExpanded())}
                    className="btnExpand"
                />
            </div>
        </div>
    );
};
