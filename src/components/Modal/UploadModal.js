import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UploadModal.scss";
import {
  chosenKeyListHandle,
  setFrameList,
  setModal,
  setUploadedFile,
} from "../../store/actions";
import { dataSeparate } from "../../utils/methods";

export const UploadModal = () => {
  const dispatch = useDispatch();
  const uploadedFile = useSelector((state) => state.uploadedFile);
  const keyTypeList = useSelector((state) => state.keySeparatorList);
  const chosenKeyList = useSelector((state) => state.chosenKeyList);
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
      dispatch(
        setUploadedFile({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          rowCount: e.target.result.split("\n").length,
          content: e.target.result,
        })
      );
    };
  };

  const chosenKeyHandle = (e, isRemove) => {
    dispatch(chosenKeyListHandle(isRemove, e.target.id));
  };

  const confirm = () => {
    dispatch(setFrameList(dataSeparate(uploadedFile.content, chosenKeyList)));
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
    return(
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
  )};

  return (
    <div className="modal-upload">
      <div className="file-view"></div>
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
