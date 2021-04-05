import { action } from "typesafe-actions";
import {HoverState, HoverTypes, ResetHover, SetHover} from "../../types";

export const setHover = (payload: HoverState): SetHover => action(HoverTypes.SET_HOVER, payload);
export const resetHover = (): ResetHover => action(HoverTypes.RESET_HOVER);
