import React from "react";
import { useSelector } from "react-redux";
import './FileInfoUpload.scss'


export const FileUploadInfo = () => {

    const uploadedFile = useSelector((state) => state.uploadedFile);
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


    const scrollToStartEndMark = (i) => {
        document
            .getElementById("row " + i )
            .scrollIntoView();
    };

    return (
        <div className="upload-info">
            {fileInfoList.map((item) => (
                <div>
                    <div className="item-name">
                        <span>{item.name}</span>
                        {["Start row", "End row"].includes(item.name) && (
                            <div
                                onClick={() =>
                                    scrollToStartEndMark(
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