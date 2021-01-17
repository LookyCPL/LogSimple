import React, { useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { setStartEndRow } from "../../redux/actions/uploadedFileActions";
import { useCombinedRefs } from "../../utils/useCombinedRefs";
import "./FileView.scss";

export const FileView = forwardRef((props, ref) => {

    const dispatch = useDispatch();
    const fileViewRef = useRef(null);
    const uploadedFile = useSelector(selectUploadedFile);
    const combinedRef = useCombinedRefs(ref, fileViewRef);
    const rows = props.rows;
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

    const modifyRow = (row, indexList) => {
      if (indexList.length === 0) return row;

      let temp = [];
      let endSubstring = row;
      let indexShift = 0;

      indexList.forEach((index) => {
        temp.push(
          endSubstring.substring(0, index.start - indexShift),
          <span className="searchedSubstring">
            {endSubstring.substring(
              index.start - indexShift,
              index.end - indexShift
            )}
          </span>
        );

        endSubstring = endSubstring.substring(
          index.end - indexShift,
          endSubstring.length
        );
        indexShift = index.end;
      });
      temp.push(endSubstring);
      return temp;
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
        let top = scrollUp;
        // if (start < 0) {
        //   start = 0;
        //   top = scrollUp;
        // }
        // if (end > rowsCount) end = rowsCount;

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
                <span className="row-content">{modifyRow(row.row, row.indexList)}</span>
              </div>
            ))}
          </div>
        );
    };

    return (
        <div  onScrollCapture={() => props.handleScroll()} ref={combinedRef} id="file-view" className="file-view">{MakeSlider(props.scrollUpSize)}</div>
    );
});

