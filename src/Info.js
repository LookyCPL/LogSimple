import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { useSelector } from "react-redux";

export const Info = () => {

    const {fileName, rowCount} = useBetween(useShareableState);
    const counter = useSelector(state => state.counter);

    return(
        <div className="info">
            <div className="infoItem">
                <label className="title">File name</label>
                <label className="value">{fileName}</label>
            </div>
            <div className="infoItem">
                <label className="title">Row count</label>
                <label className="value">{rowCount}</label>
            </div>
            <div className="infoItem">
                <label className="title">REDUX TEST</label>
                <label className="value">{counter}</label>
            </div>
        </div>
    );
};