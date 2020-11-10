import React from 'react';
import {useBetween} from 'use-between';
import {useShareableState} from "./states";

export const Info = (props) => {


    const {fileName, rowCount} = useBetween(useShareableState);

    return(
        <div className={"info"}>
            <div className={"infoItem"}>
                <label className={"title"}>File name</label>
                <label className={"value"}>{fileName}</label>
            </div>
            <div className={"infoItem"}>
                <label className={"title"}>Row count</label>
                <label className={"value"}>{rowCount}</label>
            </div>
        </div>
    );
};