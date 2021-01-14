import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeySeparatorList } from "../KeySeparatorList/KeySeparatorList";
import { dataSeparate } from "../../utils/methods";
import { FileUploadInfo } from "../FileUploadInfo/FileUploadInfo";
import { setUploadContentScrollUp } from "../../redux/actions/configActions";
import { setStartEndRow, setUploadedFile } from "../../redux/actions/uploadedFileActions";
import { setFrameList } from "../../redux/actions/frameListActions";
import { setModal } from "../../redux/actions/modalActions";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { selectKeySeparatorList } from "../../redux/selectors/keySeparatorListSelectors";
import "./UploadModal.scss";


export const UploadModal = () => {
    const dispatch = useDispatch();
    const generalConfig = useSelector(selectConfig);
    const uploadedFile = useSelector(selectUploadedFile);
    const keySeparatorList = useSelector(selectKeySeparatorList);
    const rows = uploadedFile.content.split("\n").map((row, i) => {
        return { row: row, index: i };
    });
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

    const getStartEndMark = (e, i) => {

        if (e.ctrlKey && i === uploadedFile.end || i === uploadedFile.start) return;
        let start = uploadedFile.startRow;
        let end = uploadedFile.endRow;

        if (i > uploadedFile.endRow) {
            end = i;
        } else if (i < uploadedFile.startRow) {

            start = i;
        } else if (e.ctrlKey) {
            end = i;
        } else {
            start = i
        }
        dispatch(setStartEndRow({ start: start, end: end }));
    };

    const generateMarkClass = (start, end, i) => {

        if (start === i) return "start";
        if (end === i) return "end";
        return "default";
    };

    const MakeSlider = (scrollUp) => {
        let start = scrollUp / 20;
        let end = (scrollUp / 20) + 18;

        const beforeStyle = {
            height: scrollUp + 'px',
        };
        const afterStyle = {
            height: ((rows.length * 20) - 360 - scrollUp) + 'px',
        };

        return (
            <div>
                <div style={beforeStyle} className="before"/>
                {rows.slice(start, end).map((row) => (
                    <div id={"row " + row.index} className={"row " + row.index}>
                        <button id={row.index} className={generateMarkClass(uploadedFile.startRow, uploadedFile.endRow, row.index)}
                                onClick={(e) => getStartEndMark(e, row.index)}/>
                        <span>{row.row}</span>
                    </div>
                ))}
                <div  style={afterStyle} className="after"/>
            </div>
        )
    };

    const handleScroll = () => {
        dispatch(setUploadContentScrollUp(fileViewRef.current.scrollTop));
        //scrollTop = document.getElementById("file-view").scrollTop;
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

    const scrollToStartEndMark = (i) => {
        dispatch(setUploadContentScrollUp(i*20));
        fileViewRef.current.scrollTop = i*20;
    };


    return (
      <div id={"test"} className="modal-upload" onScroll={() => handleScroll()}>
        <div ref={fileViewRef} id="file-view" className="file-view">{MakeSlider(generalConfig.uploadContentScrollUp)}</div>
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
