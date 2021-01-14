import { action } from 'typesafe-actions';
import { FilterTypes, SetFilterList } from "../../types/filterTypes";

export const setFilterList = (payload: Array): SetFilterList => action(FilterTypes.SET_FILTER_LIST, payload);