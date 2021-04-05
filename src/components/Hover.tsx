import React from "react";
import { Hover as HoverType } from "../types";

export interface HoverProps {
  hover: HoverType
}

export const Hover = (props: HoverProps) => {

  const { hover } = props;

  return (
    <div style={hover.style} className={hover.class}>
      {hover.title}
    </div>
  );
};
