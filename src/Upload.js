import React from "react";
import { useBetween } from "use-between";
import { useShareableState } from "./states";
import { dataSeparate } from "./methods";
import { useDispatch } from "react-redux";
import {setFrameList} from "./actions";


export const Upload = (props) => {
  const {
    //setFrameList,
    setRowCount,
    setIsUploaded,
    setFileName,
    setFilterList
  } = useBetween(useShareableState);

  const dispatch = useDispatch();

  const fillArray = (content) => {
    const separated = dataSeparate(content);

    //sessionStorage.setItem("frameList", JSON.stringify(separated));
    dispatch(setFrameList(separated));
    setRowCount(separated.key.length);
    setIsUploaded(true);
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
    sessionStorage.setItem("fileName", fileName);
    sessionStorage.removeItem("filterList");
    setFileName(fileName);
    setFilterList([]);
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
