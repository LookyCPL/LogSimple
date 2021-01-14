import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './FileInfoUpload.scss'
import {selectUploadedFile} from "../../redux/selectors/uploadedFileSelectors";


export const FileUploadInfo = (props) => {

    const uploadedFile = useSelector(selectUploadedFile);
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
            value: uploadedFile.startRow + 1,
        },
        {
            name: "End row",
            value: uploadedFile.endRow + 1,
        }
    ];

    return (
        <div className="upload-info">
            {fileInfoList.map((item) => (
                <div>
                    <div className="item-name">
                        <span>{item.name}</span>
                        {["Start row", "End row"].includes(item.name) && (
                            <div
                                onClick={() =>
                                    props.scrollToStartEndMark(
                                        item.name === "Start row"
                                            ? uploadedFile.startRow
                                            : uploadedFile.endRow
                                    )
                                }
                                className={
                                    item.name === "Start row"
                                        ? "btn-start-row"
                                        : "btn-end-row"
                                }
                            />
                        )}
                    </div>
                    <span className="item-value">{item.value}</span>
                </div>
            ))}
        </div>
    );
};