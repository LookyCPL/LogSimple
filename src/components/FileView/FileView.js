import React, { useState, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { setStartEndRow } from "../../redux/actions/uploadedFileActions";
import { useCombinedRefs } from "../../utils/useCombinedRefs";
import "./FileView.scss";

export const FileView = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const fileViewRef = useRef(null);
    const [scrollUpSize, setScrollUp] = useState(0);
    const uploadedFile = useSelector(selectUploadedFile);
    const combinedRef = useCombinedRefs(ref, fileViewRef);
    const rows = uploadedFile.content.split("\n").map((row, i) => {
        return { row: row, index: i };
    });
    const rowsCount = rows.length;
    const viewHeight = rowsCount*20;
    const viewContentStyle = {
        height: viewHeight
    };

    const generateMarkClass = (start, end, i) => {

        if (start === i) return "start";
        if (end === i) return "end";
        return "default";
    };

    const handleScroll = () => {
      const scrollTop = fileViewRef.current.scrollTop;
      if (scrollTop === null) return;
      setScrollUp(scrollTop);
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
        let start = scrollUp / 20 - 4;
        let end = (scrollUp / 20) + 22;
        let top = scrollUp - 40;
        if (start < 0) {
          start = 0;
          top = scrollUp;
        }
        if (end > rowsCount) end = rowsCount;

        return (
          <div className="slider" style={viewContentStyle}>
            {rows.slice(start, end).map((row, i) => (
              <div style={{top: top + i*20}} id={"row " + row.index} className={"row " + row.index}>
                <button
                  id={row.index}
                  className={generateMarkClass(
                    uploadedFile.startRow,
                    uploadedFile.endRow,
                    row.index
                  )}
                  onClick={(e) => getStartEndMark(e, row.index)}
                />
                <span>{row.row}</span>
              </div>
            ))}
          </div>
        );
    };

    return (
        <div  onScroll={() => handleScroll()} ref={combinedRef} id="file-view" className="file-view">{MakeSlider(scrollUpSize)}</div>
    );
});

