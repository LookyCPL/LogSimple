import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeySeparatorList } from "../KeySeparatorList/KeySeparatorList";
import { dataSeparate } from "../../utils/methods";
import { FileUploadInfo } from "../FileUploadInfo/FileUploadInfo";
import { setUploadContentScrollUp } from "../../redux/actions/configActions";
import { setUploadedFile } from "../../redux/actions/uploadedFileActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { setModal } from "../../redux/actions/modalActions";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { selectKeySeparatorList } from "../../redux/selectors/keySeparatorListSelectors";
import { FileView } from "../FileView/FileView";
import "./UploadModal.scss";



export const UploadModal = () => {
    const dispatch = useDispatch();
    const uploadedFile = useSelector(selectUploadedFile);
    const keySeparatorList = useSelector(selectKeySeparatorList);
    const fileViewRef = useRef(null);


    const uploadFile = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = (e) => {
            const rowCount = e.target.result.split("\n").length;

            dispatch(
                setUploadedFile({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    rowCount: rowCount,
                    content: e.target.result,
                    startRow: 0,
                    endRow: rowCount - 1,
                })
            );
        };
    };


    const confirm = () => {

        let temp = [];
        keySeparatorList.forEach((k) => {
            temp = [...temp, ...k.formatters]
        });
        const pickedUpSeparatorList = temp.filter((f) => f.isPickedUp).map((a) => a.value);

        dispatch(setFrameList(dataSeparate(uploadedFile.content.split("\n").filter((row, i) => i >= uploadedFile.startRow && i <= uploadedFile.endRow), pickedUpSeparatorList)));
        dispatch(setModal({isReset: true}));
    };

    const cancel = () => {
        dispatch(setModal({isReset: true}));
    };


    const handleScroll = () => {
        dispatch(setUploadContentScrollUp(fileViewRef.current.scrollTop));
        //scrollTop = document.getElementById("file-view").scrollTop;
    };

    const scrollToStartEndMark = (i) => {
        dispatch(setUploadContentScrollUp(i*20));
        fileViewRef.current.scrollTop = i*20;
    };


    return (
      <div id={"test"} className="modal-upload" onScroll={() => handleScroll()}>
        <FileView ref={fileViewRef} />
        <div className="panel-options">
          <div className="btn-upload">
            <label className="upload">
              <input
                className={"hidden"}
                type="file"
                id="inputFile"
                name="inputFile"
                onChange={(e) => uploadFile(e)}
              />
            </label>
          </div>
          <FileUploadInfo scrollToStartEndMark = {scrollToStartEndMark} />
          <KeySeparatorList />
          <div className="pnl-right">
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
        </div>
      </div>
    );
};
