import { action } from "typesafe-actions";
import {
    ConfigTypes,
    MarkUpStyle,
    SetCharWidthMap,
    SetFilterBind,
    SetMarkUpListExpanded,
    SetMarkUpStyleList,
    SetLobbyWidth,
    SetLobbyHeight,
} from "../../types";

export const setFilterBind = (payload: boolean): SetFilterBind => action(ConfigTypes.SET_FILTER_BIND, payload);
export const setMarkUpListExpanded = (payload: boolean): SetMarkUpListExpanded => action(ConfigTypes.SET_MARK_UP_LIST_EXPANDED, payload);
export const setMarkUpStyleList = (payload: MarkUpStyle[]): SetMarkUpStyleList => action(ConfigTypes.SET_MARK_UP_STYLE_LIST, payload);
export const setCharWidthMap = (payload: Map<string, number>): SetCharWidthMap => action(ConfigTypes.SET_CHAR_WIDTH_MAP, payload);
export const setLobbyWidth = (payload: number): SetLobbyWidth => action(ConfigTypes.SET_LOBBY_WIDTH, payload);
export const setLobbyHeight = (payload: number): SetLobbyHeight => action(ConfigTypes.SET_LOBBY_HEIGHT, payload);

