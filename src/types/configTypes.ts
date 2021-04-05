import { MarkUpStyle } from "./markUpListTypes";
import { FrameHeight } from "./frameListTypes";

export const ConfigTypes = {
  SET_FILTER_BIND: "SET_FILTER_BIND",
  SET_MARK_UP_LIST_EXPANDED: "SET_MARK_UP_LIST_EXPANDED",
  SET_MARK_UP_STYLE_LIST: "SET_MARK_UP_STYLE_LIST",
  SET_CHAR_WIDTH_MAP: "SET_CHAR_WIDTH_MAP",
  SET_LOBBY_WIDTH: "SET_LOBBY_WIDTH",
  SET_LOBBY_HEIGHT: "SET_LOBBY_HEIGHT",
};

export interface LobbyConfig {
  totalHeight: number
  lobbyHeight: number
  frameHeightList: FrameHeight[]
}

export interface Config {
  isUploaded: boolean
  isFilterBound: boolean
  isMarkUpListExpanded: boolean
  charWidthMap: Map<string, number>
  markUpStyleList: MarkUpStyle[]
  lobbyWidth: number
  lobbyHeight: number
}
export type ConfigState = Config;

export interface SetFilterBind {
  type: typeof ConfigTypes.SET_FILTER_BIND;
  payload: boolean;
}

export interface SetMarkUpListExpanded {
  type: typeof ConfigTypes.SET_MARK_UP_LIST_EXPANDED;
  payload: boolean;
}

export interface SetMarkUpStyleList {
  type: typeof ConfigTypes.SET_MARK_UP_STYLE_LIST;
  payload: MarkUpStyle[];
}

export interface SetCharWidthMap {
  type: typeof ConfigTypes.SET_CHAR_WIDTH_MAP;
  payload: Map<string, number>;
}

export interface SetLobbyWidth {
  type: typeof ConfigTypes.SET_LOBBY_WIDTH;
  payload: number;
}

export interface SetLobbyHeight {
  type: typeof ConfigTypes.SET_LOBBY_HEIGHT;
  payload: number;
}

export type ConfigActions =
  | SetFilterBind
  | SetMarkUpListExpanded
  | SetMarkUpStyleList
  | SetCharWidthMap
  | SetLobbyWidth
  | SetLobbyHeight;
