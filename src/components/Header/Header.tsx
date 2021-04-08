import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getModalStyle, getRowCount } from "../../utils/methods";
import { setModal } from "../../redux/actions/modalActions";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectFilterList } from "../../redux/selectors/filterSelectors";
import { selectFrameList } from "../../redux/selectors/frameListSelectors";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { ModalTypes } from "../../types";
import "./Header.scss";
import {CharList} from "../CharList/CharList";

export const Header = () => {
  const dispatch = useDispatch();
  const frameList = useSelector(selectFrameList);
  const filterList = useSelector(selectFilterList);
  const { fileName } = useSelector(selectUploadedFile);
  const { isFilterBound } = useSelector(selectConfig);
  const { charWidthMap } = useSelector(selectConfig);

  const rowCount = getRowCount(isFilterBound, filterList, frameList);

  const uploadFile = () => {
    dispatch(setModal(getModalStyle(ModalTypes.UPLOAD_MODAL)));
  };

  const onClickHandler = () => {

    console.log(charWidthMap);
  };

  const clearSession = () => {
    sessionStorage.clear();
  };

  return (
    <div className="header">
      <div>
        <label className="btn-upload">
          <button className="hidden" onClick={() => uploadFile()} />
        </label>
      </div>
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
      <button onClick={clearSession}>CLEAR</button>
      <button id="test" onClick={onClickHandler}>
        TEST
      </button>
    </div>
  );
};