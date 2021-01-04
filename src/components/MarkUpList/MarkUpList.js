import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHoverStyle, setMarkUpListExpanded } from "../../store/actions";
import { generateHoverStyle } from "../../utils/methods";
import "./MarkUpList.scss";


export const MarkUpList = (props) => {
    const dispatch = useDispatch();
    const frameList = useSelector((state) => state.frameList);
    const markUpList = useSelector((state) => state.markUpList);

    const hoverHandle = (isReset, index, className) => {
        const rect = !isReset ? document.getElementById("markUp-" + index).getBoundingClientRect() : "";
        const title = !isReset ? frameList[index].key : "";
        dispatch(setHoverStyle(isReset, generateHoverStyle(title, className, rect, "MARK_UP")));
    };

    const calculateCssClass = (cssClass, index) => {
        const frameClass = frameList[index].class;
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
