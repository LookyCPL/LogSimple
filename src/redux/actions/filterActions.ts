import { action } from 'typesafe-actions';
import { FilterState, FilterTypes, SetFilterList } from "../../types";

export const setFilterList = (payload: FilterState): SetFilterList => action(FilterTypes.SET_FILTER_LIST, payload);