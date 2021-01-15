import React, { useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { setStartEndRow } from "../../redux/actions/uploadedFileActions";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { useCombinedRefs } from "../../utils/useCombinedRefs";

export const FileView = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const fileViewRef = useRef(null);
    const uploadedFile = useSelector(selectUploadedFile);
    const config = useSelector(selectConfig);
    const combinedRef = useCombinedRefs(ref, fileViewRef);
    const rows = uploadedFile.content.split("\n").map((row, i) => {
        return { row: row, index: i };
    });

    const generateMarkClass = (start, end, i) => {

        if (start === i) return "start";
        if (end === i) return "end";
        return "default";
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
        dispatch(setStartEndRow({ start: start, end: end }));
    };


    const MakeSlider = (scrollUp) => {
        let start = scrollUp / 20;
        let end = (scrollUp / 20) + 18;

        const beforeStyle = {
            height: scrollUp + 'px',
        };
        const afterStyle = {
            height: ((rows.length * 20) - 360 - scrollUp) + 'px',
        };

        return (
            <div>
                <div style={beforeStyle} className="before"/>
                {rows.slice(start, end).map((row) => (
                    <div id={"row " + row.index} className={"row " + row.index}>
                        <button id={row.index} className={generateMarkClass(uploadedFile.startRow, uploadedFile.endRow, row.index)}
                                onClick={(e) => getStartEndMark(e, row.index)}/>
                        <span>{row.row}</span>
                    </div>
                ))}
                <div  style={afterStyle} className="after"/>
            </div>
        )
    };

    return (
        <div ref={combinedRef} id="file-view" className="file-view">{MakeSlider(config.uploadContentScrollUp)}</div>
    );
});

