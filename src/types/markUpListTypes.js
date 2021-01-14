import { markUpListInitial } from "../redux/initialState";

export const MarkUpListTypes = {
    SET_MARK_UP_LIST: "SET_MARK_UP_LIST"
};

export type MarkUpListState = markUpListInitial;

export interface SetMarkUpList {
    type: MarkUpListTypes.SET_MARK_UP_LIST;
    payload: Array;
}

export type MarkUpListAction =
    | SetMarkUpList
