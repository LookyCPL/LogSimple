import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeySeparatorList } from "../KeySeparatorList/KeySeparatorList";
import { FileUploadInfo } from "../FileUploadInfo/FileUploadInfo";
import { setUploadedFile } from "../../redux/actions/uploadedFileActions";
import { UploadControlPanel } from "../UploadControlPanel/UploadControlPanel";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { FileView } from "../FileView/FileView";
import "./UploadModal.scss";

interface FileReaderEventTarget extends EventTarget {
    result: string
    files: any
}

interface HTMLInputEvent extends Element {
    target: FileReaderEventTarget;
}

export const UploadModal = () => {
  const dispatch = useDispatch();
  const fileViewRef = useRef(null);
  const { content } = useSelector(selectUploadedFile);
  const [scrollUpSize, setScrollUp] = useState(0);

  const uploadFile = (e: HTMLInputEvent ) => {
      if(e.target){
          const file = e.target.files[0];
          let reader = new FileReader();

          reader.readAsText(file);
          reader.onload = (e) => {

             if(e.target){
                 const result: any = e.target.result;
                 const split: string[] = result.split("\n");
                 const rowCount = split.length;

                 dispatch(
                     setUploadedFile({
                         fileName: file.name,
                         contentType: file.type,
                         size: file.size,
                         rowCount: rowCount,
                         content: split.map((row: string, i: number) => {
                             return { row: row, index: i, indexList: [] };
                         }),
                         uploadSearchIndexes: [],
                         uploadSearchExpression: "",
                         startRow: 0,
                         endRow: rowCount - 1,
                     })
                 );
             }
          };
      }
  };

  const scrollToRow = (i: number) => {
      setScrollUp(i*20);
      // @ts-ignore
      fileViewRef.current.scrollTop = i * 20;
  };

  const handleScroll = () => {
    if (fileViewRef.current === null) return;
    // @ts-ignore
      setScrollUp(fileViewRef.current.scrollTop);
  };

    return (
    <div className="modal-upload">
      <FileView
        onScroll={handleScroll}
        scrollUpSize={scrollUpSize}
        rows={content}
        ref={fileViewRef}
      />
      <div className="panel-options">
        <div className="btn-upload">
          <label className="upload">
            <input
              className={"hidden"}
              type="file"
              id="inputFile"
              name="inputFile"
                // @ts-ignore
              onChange={(e) => uploadFile(e)}
            />
          </label>
        </div>
        <FileUploadInfo onScroll={scrollToRow} />
        <KeySeparatorList />
        <UploadControlPanel scrollToRow={scrollToRow} />
      </div>
    </div>
  );
};
