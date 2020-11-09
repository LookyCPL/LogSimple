import React from 'react';
import {useShareableState} from "./States";
import {useBetween} from 'use-between';
import "./Frame.css"




export const Frame = (props) => {

    const {frameList} = useBetween(useShareableState);

    return (
        <div className={props.class}>
            <div className="key">
                <label>{props.frKey}</label>
            </div>
            <div className="data">
                <label>{props.data}</label>
            </div>
        </div>
    );
};
