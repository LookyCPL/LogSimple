import React from "react";
import "./Frame.css";

export const Frame = (props) => (
  <div className={props.class}>
    <div className="key">
      <label>{props.frKey}</label>
    </div>
    <div className="data">
      <label>{props.data}</label>
    </div>
  </div>
);
