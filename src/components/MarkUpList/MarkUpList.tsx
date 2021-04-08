import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateFrameClass, generateHoverStyle } from "../../utils/methods";
import { setMarkUpListExpanded } from "../../redux/actions/configActions";
import { resetHover, setHover } from "../../redux/actions/hoverActions";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import { selectMarkupList } from "../../redux/selectors/markUpListSelectors";
import "./MarkUpList.scss";

export interface MarkUpListProps {
    onClick: (index: number) => void
}

export const MarkUpList = (props: MarkUpListProps) => {
    const dispatch = useDispatch();
    const { onClick } = props;
    const frameList = useSelector(selectFrameList);
    const filterList = useSelector(selectFilterList);
    const markUpList = useSelector(selectMarkupList);
    const { isFilterBound, lobbyConfig } = useSelector(selectConfig);
    const { isMarkUpListExpanded } = useSelector(selectConfig);

    const hoverHandle = (index: number, className: string) => {
        // @ts-ignore
        dispatch(setHover(generateHoverStyle(frameList[index].key, className, document.getElementById("markUp-" + index).getBoundingClientRect(), "MARK_UP")));
    };

    const calculateCssClass = (cssClass: string, index: number) => {
        const frameClass = generateFrameClass(isFilterBound, filterList, frameList[index]);
        return frameClass === "hidden" ? cssClass + " disabled" : cssClass;
    };

    return (
        <div className={"markUpList " + (isMarkUpListExpanded ? "expanded" : "")}>
            <div className={isMarkUpListExpanded ? "listContent" : "hidden"}>
                {markUpList.map((mark, i) => (
                    <div id={"markUp-" + mark.index}>
                        <button
                            key={i}
                            className={calculateCssClass(mark.style.class, mark.index)}
                            onClick={() => onClick(mark.index)}
                            onMouseEnter={() => hoverHandle(mark.index, calculateCssClass(mark.style.class, mark.index))}
                            onMouseLeave={() => dispatch(resetHover())}
                        >
                            {mark.style.letter}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={() => dispatch(setMarkUpListExpanded(!isMarkUpListExpanded))}
                    className="btnExpand"
                />
            </div>
        </div>
    );
};
