import React from "react";
import { useSelector } from "react-redux";

export const Info = () => {

    const frameList = useSelector(state => state.frameList);
    const fileName = useSelector(state => state.generalConfig.fileName);
    const rowCount = frameList.class.filter((f) => f !== "hidden").length;

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
        </div>
    );
};