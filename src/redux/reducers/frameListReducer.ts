import { Reducer } from "redux";
import { frameListInitial } from "../initialState";
import type { FrameListAction } from "../../types";
import { FrameListTypes } from "../../types";
import type { FrameListState } from "../../types";

export const frameListReducer: Reducer<FrameListState, FrameListAction> = (state = frameListInitial, action: FrameListAction) => {
  switch (action.type) {
    case FrameListTypes.SET_FRAME_LIST:
      return action.payload;
    default:
      return state;
  }
};
