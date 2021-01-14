import {frameListInitial} from "../redux/initialState";

export const FrameListTypes = {
    SET_FRAME_LIST: "SET_FRAME_LIST",
};

export type FrameListState = frameListInitial;

export interface SetFrameList {
  type: FrameListTypes.SET_FRAME_LIST;
  payload: Array;
}

export type FrameListAction =
  | SetFrameList
