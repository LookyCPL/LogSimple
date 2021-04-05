import React from "react";
import CSS from 'csstype';
import "./Frame.scss";
import { useSelector } from "react-redux";
import { filterIndexListMerge } from "../../utils/methods";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { Filter, FilterItem, FrameItem, IndexItem } from "../../types";
import { selectFilterList } from "../../redux/selectors/filterSelectors";

export interface FrameProps {
    frame: FrameItem
    onClick: () => void
    style: CSS.Properties
}

const prepareData = (filterItemList: FilterItem[], data: string, filterList: Filter[]) => {
    if (!data || !filterItemList) return data;
    if (filterItemList.length === 0) return data;

    let temp = [];
    let endSubstring = data;
    let indexShift = 0;

    filterList.filter((f) => f.isFilterOn);
    const filterKeys = filterList.filter((f) => f.isFilterOn).map((f) => f.key);
    const indexList: IndexItem[] = filterIndexListMerge(filterItemList.filter((item) => filterKeys.indexOf(item.id) > -1));

    indexList.forEach((indexes) => {
        temp.push(
            endSubstring.substring(0, indexes.start - indexShift),
            <span className="filterItemSubstring">
          {endSubstring.substring(
              indexes.start - indexShift,
              indexes.end - indexShift
          )}
        </span>
        );
        endSubstring = endSubstring.substring(
            indexes.end - indexShift,
            endSubstring.length
        );
        indexShift = indexes.end;
    });
    temp.push(endSubstring);
    return temp;
};

export const Frame = (props: FrameProps) => {

    const { frame, onClick, style } = props;
    const { index, isMarked, colorClass, key, data, filterItemList} = frame;
    const filterList = useSelector(selectFilterList);
    const { lobbyWidth } = useSelector(selectConfig);

    const dataStyle = {
        width: lobbyWidth,
    };

    return (
        <div id={index + " - " + key} style={style} className={'frame'}>
            <div className={isMarked ? "key marked " : "key"}>
                <button className={colorClass} key={key} onClick={onClick}>
                    {key}
                </button>
            </div>
            <div className="data" style={dataStyle}>
                <span>{prepareData(filterItemList, data, filterList)}</span>
            </div>
        </div>
    );
};
