import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { dataSeparate, bodyFormatter } from "./methods";

export const Upload = (props) => {
  const {
    setFrameList,
    frameList,
    setRowCount,
    setIsUploaded,
    setFileName,
  } = useBetween(useShareableState);

  const fillArray = (fileContent) => {
    const separated = dataSeparate(fileContent);

    setFrameList(separated);
    setRowCount(frameList.key.length);
    setIsUploaded(true);
    //setFrameList(bodyFormatter(frameList, frameList.get("data")));
  };

  const uploadFile = (e) => {
    let files = e.target.files;
    let reader = new FileReader();

    reader.readAsText(files[0]);
    reader.onload = (e) => {
      fillArray(e.target.result);
    };

    setFileName(e.target.files[0].name);
  };

  return (
    <div>
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
  );
};
