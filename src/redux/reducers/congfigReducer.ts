import { Reducer } from 'redux';
import {ConfigTypes, FrameHeight, LobbyConfig, LobbySize, MarkUpStyle} from "../../types";
import type { ConfigState, ConfigActions } from "../../types";
import { configInitial } from "../initialState";

export const configReducer: Reducer<ConfigState, ConfigActions> = (state = configInitial, action: ConfigActions) => {
    switch (action.type) {
        case ConfigTypes.SET_FILTER_BIND:
            state.isFilterBound = <boolean>action.payload;
            return {...state};

        case ConfigTypes.SET_MARK_UP_LIST_EXPANDED:
            const isExpanded = state.isMarkUpListExpanded;
            state.isMarkUpListExpanded = !isExpanded;
            return state;

        case ConfigTypes.SET_MARK_UP_STYLE_LIST:
            state.markUpStyleList = <MarkUpStyle[]>action.payload;
            return state;

        case ConfigTypes.SET_CHAR_WIDTH_MAP:
            state.charWidthMap = <Map<string,number>>action.payload;
            return {...state};

        case ConfigTypes.SET_LOBBY_SIZE:
            const lobbySize: LobbySize = <LobbySize>action.payload;
            state.lobbyConfig.lobbyWidth = lobbySize.width;
            state.lobbyConfig.lobbyHeight = lobbySize.height;
            return state;

        case ConfigTypes.SET_LOBBY_CONFIG:
            state.lobbyConfig = <LobbyConfig>action.payload;
            return state;

        case ConfigTypes.SET_TOP_FRAME:
            state.lobbyConfig.topFrame = <FrameHeight>action.payload;
            return {...state};

        default:
            return state;
    }
};

