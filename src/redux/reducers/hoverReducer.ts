import { Reducer } from "redux";
import { hoverInitial } from "../initialState";
import type { HoverState, HoverAction } from "../../types";
import { HoverTypes } from "../../types";

export const hoverReducer: Reducer<HoverState, HoverAction> = (state = hoverInitial, action: HoverAction) => {
  switch (action.type) {
    case HoverTypes.SET_HOVER:
      if ("payload" in action) {
        return action.payload;
      }
    case HoverTypes.RESET_HOVER:
      return hoverInitial;
    default:
      return state;
  }
};