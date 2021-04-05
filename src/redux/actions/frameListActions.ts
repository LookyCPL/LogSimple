import { action } from "typesafe-actions";
import { FrameListState, FrameListTypes, SetFrameList } from "../../types";

export const setFrameList = (payload: FrameListState): SetFrameList => action(FrameListTypes.SET_FRAME_LIST, payload);
