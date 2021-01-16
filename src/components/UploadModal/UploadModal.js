import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { KeySeparatorList } from "../KeySeparatorList/KeySeparatorList";
import { FileUploadInfo } from "../FileUploadInfo/FileUploadInfo";
import { setUploadedFile } from "../../redux/actions/uploadedFileActions";
import { UploadControlPanel } from "../UploadControlPanel/UploadControlPanel";
import { FileView } from "../FileView/FileView";
import "./UploadModal.scss";

export const UploadModal = () => {
    const dispatch = useDispatch();
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

    const scrollToStartEndMark = (i) => {
        fileViewRef.current.scrollTop = i*20;
    };

    return (
      <div className="modal-upload" >
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
          <UploadControlPanel />
        </div>
      </div>
    );
};
