import { Reducer } from 'redux';
import { markUpListInitial } from "../initialState";
import type { MarkUpListState, MarkUpListAction } from "../../types/markUpListTypes";
import { MarkUpListTypes } from "../../types/markUpListTypes";

export const markUpListReducer: Reducer<MarkUpListState, MarkUpListAction> = (state = markUpListInitial, action: MarkUpListAction) => {
    switch (action.type){
        case MarkUpListTypes.SET_MARK_UP_LIST:
            return action.payload;
        default:
            return state;
    }
};
