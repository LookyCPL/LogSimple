import { action } from "typesafe-actions";
import { HoverTypes, SetHover } from "../../types/hoverTypes";

export const setHover = (payload: Object): SetHover => action(HoverTypes.SET_HOVER, payload);
