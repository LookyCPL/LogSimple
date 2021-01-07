import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chosenKeyListHandle, setFrameList, setModal, setStartEndRow, setUploadedFile } from "../../store/actions";
import { dataSeparate } from "../../utils/methods";
import "./UploadModal.scss";

export const UploadModal = () => {
    const dispatch = useDispatch();
    const uploadedFile = useSelector((state) => state.uploadedFile);
    const keyTypeList = useSelector((state) => state.keySeparatorList);
    const chosenKeyList = useSelector((state) => state.chosenKeyList);
    const rows = uploadedFile.content.split("\n");
    const fileInfoList = [
        {
            name: "File name",
            value: uploadedFile.fileName,
        },
        {
            name: "Content type",
            value: uploadedFile.contentType,
        },
        {
            name: "Size",
            value: uploadedFile.size,
        },
        {
            name: "Row count",
            value: uploadedFile.rowCount,
        },
        {
            name: "Start row",
            value: 0,
        },
        {
            name: "End row",
            value: uploadedFile.rowCount,
        }
    ];

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

    const chosenKeyHandle = (e, isRemove) => {
        dispatch(chosenKeyListHandle(isRemove, e.target.id));
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
        dispatch(setFrameList(dataSeparate(rows.filter((row, i) => i >= uploadedFile.startRow && i <= uploadedFile.endRow), chosenKeyList)));
        dispatch(setModal(true));
    };

    const cancel = () => {
        dispatch(setModal(true));
    };

    const FileUploadInfo = () => {
        return (
            <div className="upload-info">
                <div className="file-info">
                    {fileInfoList.map((item) => (
                        <div>
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                        </div>
                    ))}
                </div>
                <div className="chosen-keys">
                    {chosenKeyList.map((key) => (
                        <div>
                            <span>{key}</span>
                            <button id={key} onClick={(e) => chosenKeyHandle(e, true)}>
                                x
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const KeySeparatorList = () => {
        return (
            <div className="key-separators">{
                keyTypeList.map((keyType) => (
                    <div className="keyItem">
                        <span className="keyType">{keyType.type}</span>
                        {keyType.values.map((key) => (
                            <div className="key">
                                <span>{key}</span>
                                <button id={key} onClick={(e) => chosenKeyHandle(e, false)}>
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                ))
            }</div>
        )
    };

    return (
        <div id={"test"} className="modal-upload">
            <div className="file-view">
                {rows.map((row, i) => (
                    <div className="row">
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
                <div className="pnl-left">
                    <div className="chosen-keys"></div>
                    <div className="buttons">
                        <button onClick={() => cancel()}>Cancel</button>
                        <button onClick={() => confirm()}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
