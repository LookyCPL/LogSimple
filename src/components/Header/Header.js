import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../store/actions";
import { getModalStyle, getRowCount } from "../../utils/methods";
import "./Header.scss";

export const Header = () => {

    const dispatch = useDispatch();
    const frameList = useSelector(state => state.frameList);
    const filterList = useSelector(state => state.filterList);
    const uploadedFile = useSelector(state => state.uploadedFile);
    const isFilterBound = useSelector(state => state.generalConfig.isFilterBound);

    const rowCount = getRowCount(isFilterBound, filterList, frameList);

    const uploadFile = () => {
        dispatch(setModal(false, getModalStyle("UPLOAD_MODAL")));
    };

    const onClickHandler = (e) => {
        // for testing
    };

    const clearSession = () => {
        sessionStorage.clear();
    };

    return(
        <div className="header">
            <div>
                <label className="btn-upload">
                    <button
                        className="hidden"
                        onClick={(e) => uploadFile(e)}
                    />
                </label>
            </div>
            <div className="info">
                <div className="infoItem">
                    <label className="title">File name</label>
                    <label className="value">{uploadedFile.fileName}</label>
                </div>
                <div className="infoItem">
                    <label className="title">Row count</label>
                    <label className="value">{rowCount}</label>
                </div>
            </div>
            <button onClick={clearSession}>CLEAR</button>
            <button id="test" onClick={onClickHandler}>TEST</button>
        </div>
    );
};