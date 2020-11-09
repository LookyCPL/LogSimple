import React from 'react';
import {Frame} from "./Frame";
import {useShareableState} from "./States";
import {useBetween} from 'use-between';
import "./App.css";
import {filterIndexListMerge} from './Methods';


export const Lobby = (props) => {

    const {frameList} = useBetween(useShareableState);

    let classList = frameList.class.slice();
    let keyList = frameList.key.slice();
    let dataList = frameList.data.slice();
    let filterItemList = frameList.filterItemList.slice();
    let Frames = [];

    const prepareData = (filterItemList, data) => {

        if (data && filterItemList) {

            if(filterItemList.length > 0){

                    let temp = [];
                    let endSubstring = data;
                    let indexShift = 0;

                    for(const indexes of filterIndexListMerge(filterItemList)){

                        temp.push(endSubstring.substring(0,indexes.start - indexShift),<span className="filterItemSubstring">{endSubstring.substring(indexes.start - indexShift,indexes.end - indexShift)}</span>);
                        endSubstring = endSubstring.substring(indexes.end - indexShift,endSubstring.length);
                        indexShift = indexes.end;
                    }
                    temp.push(endSubstring);
                    return temp;
            }
        }
            return data;
    };

    const renderFrame = (frameClass, frameKey, frameData, frameFilterItemList) => {

        return (
            <Frame
                class={frameClass}
                frKey={frameKey}
                data={frameData}
                filterItemList={frameFilterItemList}
            />
        )
    };

    for (let i = 0; i < keyList.length; i++) {

        Frames.push(renderFrame(classList[i], keyList[i], prepareData(filterItemList[i], dataList[i]), filterItemList[i]));
    }

    return (
        <div>{Frames}</div>
    );
};