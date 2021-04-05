
export const MarkUpListTypes = {
    SET_MARK_UP_LIST: "SET_MARK_UP_LIST"
};

export interface MarkUpStyle {
    index: number
    class: string
    letter: string
}

export interface MarkUp {
    key: string
    index: number
    style: MarkUpStyle
}

export type MarkUpListState = MarkUp[];

export interface SetMarkUpList {
    type: typeof MarkUpListTypes.SET_MARK_UP_LIST;
    payload: MarkUpListState;
}

export type MarkUpListAction = SetMarkUpList
