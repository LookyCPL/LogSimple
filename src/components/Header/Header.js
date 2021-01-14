import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModalStyle, getRowCount } from "../../utils/methods";
import "./Header.scss";
import {setModal} from "../../redux/actions/modalActions";
import {selectConfig} from "../../redux/selectors/configSelectors";
import {selectFilterList} from "../../redux/selectors/filterSelectors";
import {selectFrameList} from "../../redux/selectors/frameListSelectors";
import {selectUploadedFile} from "../../redux/selectors/uploadedFileSelectors";

export const Header = () => {

    const dispatch = useDispatch();
    const frameList = useSelector(selectFrameList);
    const filterList = useSelector(selectFilterList);
    const uploadedFile = useSelector(selectUploadedFile);
    const isFilterBound = useSelector(selectConfig).isFilterBound;

    const rowCount = getRowCount(isFilterBound, filterList, frameList);

    const uploadFile = () => {
      dispatch(
        setModal({ isReset: false, modal: getModalStyle("UPLOAD_MODAL") })
      );
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