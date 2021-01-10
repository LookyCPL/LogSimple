import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFrameList, setModal, setStartEndRow, setUploadedFile } from "../../store/actions";
import { KeySeparatorList } from "../KeySeparatorList/KeySeparatorList";
import { dataSeparate } from "../../utils/methods";
import { FileUploadInfo } from "../FileUploadInfo/FileUploadInfo";
import "./UploadModal.scss";



export const UploadModal = () => {
    const dispatch = useDispatch();
    const uploadedFile = useSelector((state) => state.uploadedFile);
    const keySeparatorList = useSelector((state) => state.keySeparatorList);
    const rows = uploadedFile.content.split("\n");

    const uploadFile = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();

        reader.readAsText(file);
        reader.onload = (e) => {
            let rows = e.target.result.split("\n");
            dispatch(
                setUploadedFile({
                    fileName: file.name,
                    contentType: file.type,
                    size: file.size,
                    rowCount: rows.length,
                    content: e.target.result,
                    startRow: 0,
                    endRow: rows.length - 1,
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
        dispatch(setStartEndRow(start, end));
    };

    const generateMarkClass = (start, end, i) => {

        if (start === i) return "start";
        if (end === i) return "end";
        return "default";
    };

    const confirm = () => {

        let temp = [];
        keySeparatorList.forEach((k) => {temp = [...temp, ...k.formatters]});
        const pickedUpSeparatorList = temp.filter((f) => f.isPickedUp).map((a) => a.value);

        dispatch(setFrameList(dataSeparate(rows.filter((row, i) => i >= uploadedFile.startRow && i <= uploadedFile.endRow), pickedUpSeparatorList)));
        dispatch(setModal(true));
    };

    const cancel = () => {
        dispatch(setModal(true));
    };

    return (
        <div id={"test"} className="modal-upload">
            <div className="file-view">
                {rows.map((row, i) => (
                    <div id={"row " + i} className={"row " + i}>
                        <button id={i} className={generateMarkClass(uploadedFile.startRow, uploadedFile.endRow, i)}
                                onClick={(e) => getStartEndMark(e, i)}/>
                        <span>{row}</span>
                    </div>
                ))}
            </div>
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
                <FileUploadInfo/>
                <KeySeparatorList/>
                <div className="pnl-right">
                    <div className="content-search">
                        <span className="title">Search in content</span>
                        <div className="content">
                            <input className="input"/>
                            <div className="btn-search">Search</div>
                            <div className="pnl-find">
                                <div className="btn-up"/>
                                <div className="btn-down"/>
                            </div>
                        </div>
                    </div>
                    <div className="var-key-loader">
                        <span className="title">Key separator add</span>
                        <div className="content">
                            <input className="input"/>
                            <div className="btn-add">Add</div>
                        </div>
                    </div>
                    <div className="pnl-buttons">
                        <div className={"btn cancel"} onClick={() => cancel()}>Cancel</div>
                        <div className={"btn confirm"} onClick={() => confirm()}>Upload</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
