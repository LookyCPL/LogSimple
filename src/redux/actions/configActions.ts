import { action } from "typesafe-actions";
import {
    ConfigTypes,
    MarkUpStyle,
    SetCharWidthMap,
    SetFilterBind,
    SetMarkUpListExpanded,
    SetMarkUpStyleList,
    LobbySize,
    SetLobbySize,
    SetLobbyConfig,
    LobbyConfig,
    FrameHeight,
    SetTopFrame,
} from "../../types";

export const setFilterBind = (payload: boolean): SetFilterBind => action(ConfigTypes.SET_FILTER_BIND, payload);
export const setMarkUpListExpanded = (payload: boolean): SetMarkUpListExpanded => action(ConfigTypes.SET_MARK_UP_LIST_EXPANDED, payload);
export const setMarkUpStyleList = (payload: MarkUpStyle[]): SetMarkUpStyleList => action(ConfigTypes.SET_MARK_UP_STYLE_LIST, payload);
export const setCharWidthMap = (payload: Map<string, number>): SetCharWidthMap => action(ConfigTypes.SET_CHAR_WIDTH_MAP, payload);
export const setLobbySize = (payload: LobbySize): SetLobbySize => action(ConfigTypes.SET_LOBBY_SIZE, payload);
export const setLobbyConfig = (payload: LobbyConfig): SetLobbyConfig => action(ConfigTypes.SET_LOBBY_CONFIG, payload);
export const setTopFrame = (payload: FrameHeight): SetTopFrame => action(ConfigTypes.SET_TOP_FRAME, payload);

