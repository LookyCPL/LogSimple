import { action } from "typesafe-actions";
import { FrameListTypes, SetFrameList } from "../../types/frameListTypes";

export const setFrameList = (payload: Array): SetFrameList => action(FrameListTypes.SET_FRAME_LIST, payload);
