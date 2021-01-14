import { Reducer } from 'redux';
import { FilterTypes } from "../../types/filterTypes";
import type {FilterAction, FilterState} from "../../types/filterTypes";
import {filterListInitial} from "../initialState";

export const filterListReducer: Reducer<FilterState, FilterAction> = (state = filterListInitial, action: FilterAction) => {
    switch (action.type) {
        case FilterTypes.SET_FILTER_LIST:
            return action.payload;
        default:
            return state;
    }
};

