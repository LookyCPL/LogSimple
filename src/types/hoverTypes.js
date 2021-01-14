import {hoverInitial} from "../redux/initialState";

export const HoverTypes = {
    SET_HOVER: "SET_HOVER",
};

export type HoverState = hoverInitial;

export interface SetHover {
    type: HoverTypes.SET_HOVER;
    payload: boolean;
}

export type HoverAction =
    | SetHover
