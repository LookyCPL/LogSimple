import { MarkUpStyle } from "./markUpListTypes";

export const ConfigTypes = {
  SET_FILTER_BIND: "SET_FILTER_BIND",
  SET_MARK_UP_LIST_EXPANDED: "SET_MARK_UP_LIST_EXPANDED",
  SET_MARK_UP_STYLE_LIST: "SET_MARK_UP_STYLE_LIST",
  SET_CHAR_WIDTH_MAP: "SET_CHAR_WIDTH_MAP",
  SET_LOBBY_SIZE: "SET_LOBBY_SIZE",
  SET_LOBBY_CONFIG: "SET_LOBBY_CONFIG",
  SET_TOP_FRAME: "SET_TOP_FRAME",
};

export interface FrameHeight {
  index: number
  height: number
  top: number
  orderIndex: number
}

export interface LobbySize {
  height: number;
  width: number;
}

export interface LobbyConfig {
  totalHeight: number;
  lobbyHeight: number;
  lobbyWidth: number;
  frameHeightList: FrameHeight[];
  topFrame: FrameHeight;
}

export interface Config {
  isUploaded: boolean;
  isFilterBound: boolean;
  isMarkUpListExpanded: boolean;
  charWidthMap: Map<string, number>;
  markUpStyleList: MarkUpStyle[];
  lobbyConfig: LobbyConfig;
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

export interface SetLobbySize {
  type: typeof ConfigTypes.SET_LOBBY_SIZE;
  payload: LobbySize;
}

export interface SetLobbyConfig {
  type: typeof ConfigTypes.SET_LOBBY_CONFIG;
  payload: LobbyConfig;
}

export interface SetTopFrame {
  type: typeof ConfigTypes.SET_TOP_FRAME;
  payload: FrameHeight;
}

export type ConfigActions =
  | SetFilterBind
  | SetMarkUpListExpanded
  | SetMarkUpStyleList
  | SetCharWidthMap
  | SetLobbySize
  | SetLobbyConfig
  | SetTopFrame;
