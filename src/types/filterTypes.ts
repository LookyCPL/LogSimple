import {filterListInitial} from "../redux/initialState";

export const FilterTypes = {
    SET_FILTER_LIST: "SET_FILTER_LIST",
};

export interface Filter {
    key: string
    isFilterOn: boolean
}

export type FilterState = Filter[]

export interface SetFilterList {
    type: typeof FilterTypes.SET_FILTER_LIST,
    payload: Filter[],
}

export type FilterAction =
    | SetFilterList


