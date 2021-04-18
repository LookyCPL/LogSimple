import { action } from "typesafe-actions";
import {
    ConfigTypes,
    MarkUpStyle,
    SetFilterBind,
    SetMarkUpListExpanded,
    SetMarkUpStyleList,
} from "../../types";

export const setFilterBind = (payload: boolean): SetFilterBind => action(ConfigTypes.SET_FILTER_BIND, payload);
export const setMarkUpListExpanded = (payload: boolean): SetMarkUpListExpanded => action(ConfigTypes.SET_MARK_UP_LIST_EXPANDED, payload);
export const setMarkUpStyleList = (payload: MarkUpStyle[]): SetMarkUpStyleList => action(ConfigTypes.SET_MARK_UP_STYLE_LIST, payload);

