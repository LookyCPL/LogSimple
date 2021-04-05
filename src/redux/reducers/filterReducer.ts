import { Reducer } from 'redux';
import { FilterTypes } from "../../types";
import type { FilterAction, FilterState } from "../../types";
import { filterListInitial } from "../initialState";

export const filterListReducer: Reducer<FilterState, FilterAction> = (state = filterListInitial, action: FilterAction) => {
    switch (action.type) {
        case FilterTypes.SET_FILTER_LIST:
            return action.payload;
        default:
            return state;
    }
};

