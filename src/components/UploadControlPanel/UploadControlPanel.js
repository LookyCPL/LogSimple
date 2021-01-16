import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modalActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { dataSeparate } from "../../utils/methods";
import { selectKeySeparatorList } from "../../redux/selectors/keySeparatorListSelectors";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import "./UploadControlPanel.scss";

export const UploadControlPanel = () => {
  const dispatch = useDispatch();
  const keySeparatorList = useSelector(selectKeySeparatorList);
  const uploadedFile = useSelector(selectUploadedFile);

  const cancel = () => {
    dispatch(setModal({ isReset: true }));
  };

  const confirm = () => {
    let temp = [];
    keySeparatorList.forEach((k) => {
      temp = [...temp, ...k.formatters];
    });
    const pickedUpSeparatorList = temp
      .filter((f) => f.isPickedUp)
      .map((a) => a.value);

    dispatch(
      setFrameList(
        dataSeparate(
          uploadedFile.content
            .split("\n")
            .filter(
              (row, i) => i >= uploadedFile.startRow && i <= uploadedFile.endRow
            ),
          pickedUpSeparatorList
        )
      )
    );
    dispatch(setModal({ isReset: true }));
  };

  return (
    <div className="pnl-upload-control">
      <div className="content-search">
        <span className="title">Search in content</span>
        <div className="content">
          <input className="input" />
          <div className="btn-search">Search</div>
          <div className="pnl-find">
            <div className="btn-up" />
            <div className="btn-down" />
          </div>
        </div>
      </div>
      <div className="var-key-loader">
        <span className="title">Key separator add</span>
        <div className="content">
          <input className="input" />
          <div className="btn-add">Add</div>
          <div className="info" />
        </div>
      </div>
      <div className="pnl-buttons">
        <div className={"btn cancel"} onClick={() => cancel()}>
          Cancel
        </div>
        <div className={"btn confirm"} onClick={() => confirm()}>
          Upload
        </div>
      </div>
    </div>
  );
};
