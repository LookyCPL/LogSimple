import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions/modalActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { modifyUploadContent, setUploadSearchExpression } from "../../redux/actions/uploadedFileActions";
import { dataSeparate } from "../../utils/methods";
import { selectKeySeparatorList } from "../../redux/selectors/keySeparatorListSelectors";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import "./UploadControlPanel.scss";

export const UploadControlPanel = (props) => {
  const dispatch = useDispatch();
  const keySeparatorList = useSelector(selectKeySeparatorList);
  const { uploadSearchIndexes, uploadSearchExpression, startRow, endRow, content, } = useSelector(selectUploadedFile);
  const [searchIndex, setSearchIndex] = useState(0);

  const searchForExpression = () => {
    uploadSearchExpression.length > 0 && dispatch(modifyUploadContent(uploadSearchExpression));
    //uploadSearchIndexes.length > 0 && props.scrollToRow(uploadSearchIndexes[0]); vyresit !!!
  };

  const walkThroughExpression = (direction) => {

    if(uploadSearchIndexes.length === 0) return;

    let temp = searchIndex;
    if( direction === "UP" && searchIndex !== 0){
      temp--;
    }
    else if( direction === "DOWN" && searchIndex < uploadSearchIndexes.length - 1){
      temp++;
    }
    setSearchIndex(temp);
    props.scrollToRow(uploadSearchIndexes[temp]);
  };

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
          content
            .filter((row, i) => i >= startRow && i <= endRow)
            .map((row) => row.row),
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
          <input
            className="input"
            value={uploadSearchExpression}
            onInput={(e) => dispatch(setUploadSearchExpression(e.target.value))}
          />
          <div onClick={() => searchForExpression()} className="btn-search">
            Search
          </div>
          <div className="pnl-find">
            <div className="btn-up" onClick={() => walkThroughExpression("UP")}/>
            <div className="btn-down" onClick={() => walkThroughExpression("DOWN")}/>
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
