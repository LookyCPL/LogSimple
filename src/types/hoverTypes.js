import {hoverInitial} from "../redux/initialState";

export const HoverTypes = {
    SET_HOVER: "SET_HOVER",
};

export type HoverState = hoverInitial;

export interface SetHover {
    type: HoverTypes.SET_HOVER;
    payload: Object;
}

export type HoverAction =
    | SetHover
