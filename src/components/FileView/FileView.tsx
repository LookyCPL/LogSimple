import React, { useRef, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadedFile } from "../../redux/selectors/uploadedFileSelectors";
import { setStartEndRow } from "../../redux/actions/uploadedFileActions";
import { useCombinedRefs } from "../../utils/useCombinedRefs";
import "./FileView.scss";
import { FileRow, RowIndexes } from "../../types";

export interface FileViewProps {
    rows: FileRow[]
    onScroll: () => void
    scrollUpSize: number
}

interface Event{
    ctrlKey : boolean;
}

export const FileView = forwardRef((props: FileViewProps, ref) => {

    const { rows, onScroll, scrollUpSize } = props;
    const dispatch = useDispatch();
    const fileViewRef = useRef(null);
    const uploadedFile = useSelector(selectUploadedFile);
    const { startRow, endRow } = uploadedFile;
    const combinedRef = useCombinedRefs(ref, fileViewRef);
    const rowsCount = rows.length;
    const viewHeight = rowsCount*20;
    const viewContentStyle = {
        height: viewHeight
    };

    const generateMarkClass = (start: number, end: number, i: number) => {
      if (start === i) return "start";
      if (end === i) return "end";
      return "default";
    };

    const modifyRow = (row: string, indexList: RowIndexes[]) => {
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

    const getStartEndMark = (e: Event, i: number) => {

        if (e.ctrlKey && i === startRow || i === endRow) return;
        let start = startRow;
        let end = endRow;

        if (i > endRow) {
            end = i;
        } else if (i < startRow) {

            start = i;
        } else if (e.ctrlKey) {
            end = i;
        } else {
            start = i
        }
        dispatch(setStartEndRow({ start: start, end: end }));
    };

    const MakeSlider = (scrollUp: number) => {
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
            {rows.slice(start, end).map((row: FileRow, i: number) => (
              <div style={{top: top + i*20}} id={"row " + row.index} className={"row " + row.index}>
                <button
                  className={generateMarkClass(
                    startRow,
                    endRow,
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
        <div  onScrollCapture={() => onScroll()} ref={combinedRef} id="file-view" className="file-view">{MakeSlider(scrollUpSize)}</div>
    );
});

