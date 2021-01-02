import React from "react";

export const Hover = (props) => {
  return (
    <div style={props.style} className={props.class}>
      {props.title}
    </div>
  );
};
