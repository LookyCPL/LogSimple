import CSS from 'csstype';

export const HoverTypes = {
    SET_HOVER: "SET_HOVER",
    RESET_HOVER: 'RESET_HOVER',
};

export interface Hover {
    title: string
    class: string
    style?: CSS.Properties
}

export type HoverState = Hover;

export interface SetHover {
    type: typeof HoverTypes.SET_HOVER;
    payload: HoverState;
}

export interface ResetHover {
    type: typeof HoverTypes.RESET_HOVER;
}

export type HoverAction = SetHover | ResetHover;
