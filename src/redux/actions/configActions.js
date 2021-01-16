import { action } from "typesafe-actions";
import { ConfigTypes, SetFilterBind, SetMarkUpListExpanded, SetMarkUpStyleList } from "../../types/configTypes";

export const setFilterBind = (payload: boolean): SetFilterBind => action(ConfigTypes.SET_FILTER_BIND, payload);
export const setMarkUpListExpanded = (payload: boolean): SetMarkUpListExpanded => action(ConfigTypes.SET_MARK_UP_LIST_EXPANDED, payload);
export const setMarkUpStyleList = (payload: Array): SetMarkUpStyleList => action(ConfigTypes.SET_MARK_UP_STYLE_LIST, payload);
