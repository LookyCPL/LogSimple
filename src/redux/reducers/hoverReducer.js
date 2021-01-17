import { Reducer } from "redux";
import { hoverInitial } from "../initialState";
import type { HoverState, HoverAction } from "../../types/hoverTypes";
import { HoverTypes } from "../../types/hoverTypes";

export const hoverReducer: Reducer<HoverState, HoverAction> = (state = hoverInitial, action: HoverAction) => {
  switch (action.type) {
    case HoverTypes.SET_HOVER:
      if (!action.payload) return hoverInitial;
      return action.payload;
    default:
      return state;
  }
};