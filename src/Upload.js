import React from 'react';
import {useShareableState} from "./States";
import {useBetween} from 'use-between';
import {dateTypeRecognizer, dataSeparateGet, bodyFormatter} from "./Methods";


export const Upload = (props) => {

    const {setFrameList, frameList, setRowCount, setIsUploaded, setFileName} = useBetween(useShareableState);

    const FillArray = () => {

        setFrameList(dateTypeRecognizer(frameList, localStorage.getItem('text')));
        setFrameList(dataSeparateGet(frameList, localStorage.getItem('text'), frameList.key));
        setRowCount(frameList.key.length);
        setIsUploaded(true);
        //setFrameList(bodyFormatter(frameList, frameList.get("data")));
    };

    const uploadFile = (e) => {

        let files = e.target.files;
        let reader = new FileReader();

        reader.readAsText(files[0]);

        reader.onload = (e) => {
            //console.log(e.target.result);
            localStorage.setItem('text', e.target.result);
            FillArray();
            console.log(e);
        };
    };

    return (
        <div>
            <label className="upload">
                <input className={"hidden"} type="file" id="inputFile" name="inputFile" onChange={(e) => uploadFile(e)}/>
            </label>
        </div>

    );

};