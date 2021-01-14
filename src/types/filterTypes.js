import {filterListInitial} from "../redux/initialState";

export const FilterTypes = {
    SET_FILTER_LIST: "SET_FILTER_LIST",
};
export type FilterState = filterListInitial;

export interface SetFilterList {
    type: FilterTypes.SET_FILTER_LIST,
    payload: Array,
}

export type FilterAction =
    | SetFilterList


