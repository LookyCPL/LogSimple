import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetModal } from "../../redux/actions/modalActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { expressionSearch, setUploadSearchExpression } from "../../redux/actions/uploadedFileActions";
import { dataSeparate } from "../../utils/methods";
import { selectKeySeparatorList } from "../../redux/selectors/keySeparatorListSelectors";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { setMarkUpList } from "../../redux/actions/markUpListActions";
import "./UploadControlPanel.scss";

export const UploadControlPanel = (props) => {
  const dispatch = useDispatch();
  const keySeparatorList = useSelector(selectKeySeparatorList);
  const { uploadSearchIndexes, uploadSearchExpression, startRow, endRow, content } = useSelector(selectUploadedFile);
  const [searchIndex, setSearchIndex] = useState(0);

  const searchForExpression = () => {
    uploadSearchExpression.length > 0 && dispatch(expressionSearch());
  };

  useEffect(() => {
    uploadSearchIndexes.length > 0 && props.scrollToRow(uploadSearchIndexes[0]);
  }, [uploadSearchIndexes]);

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
    dispatch(resetModal());
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
    dispatch(resetModal());
    dispatch(setMarkUpList([]))
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
