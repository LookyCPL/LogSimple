import React from "react";
import { useDispatch } from "react-redux";
import { dataSeparate } from "./methods";
import { setRowCount, setFilterList, setFrameList, uploadFile as uploadFileAction } from "../store/actions";

export const Upload = () => {
  const dispatch = useDispatch();

  const fillArray = (content) => {
    const separated = dataSeparate(content);

    dispatch(setFrameList(separated));
    dispatch(setRowCount(separated.key.length));
  };

  const uploadFile = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    let fileName;

    reader.readAsText(files[0]);
    reader.onload = (e) => {
      fillArray(e.target.result);
    };
    fileName = e.target.files[0].name;
    dispatch(uploadFileAction(fileName));
    dispatch(setFilterList([]));
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
