import { MarkUpStyle } from "./markUpListTypes";

export const ConfigTypes = {
  SET_FILTER_BIND: "SET_FILTER_BIND",
  SET_MARK_UP_LIST_EXPANDED: "SET_MARK_UP_LIST_EXPANDED",
  SET_MARK_UP_STYLE_LIST: "SET_MARK_UP_STYLE_LIST",
  SET_CHAR_WIDTH_MAP: "SET_CHAR_WIDTH_MAP",
  SET_CONTENT_PAGE_WIDTH: "SET_CONTENT_PAGE_WIDTH",
};

export interface ConfigState {
  isUploaded: boolean;
  isFilterBound: boolean;
  isMarkUpListExpanded: boolean;
  charWidthMap: Map<string, number>;
  markUpStyleList: MarkUpStyle[];
  contentPageWidth: number;
}

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

export interface SetContentPageWidth {
  type: typeof ConfigTypes.SET_CONTENT_PAGE_WIDTH;
  payload: number;
}

export type ConfigActions =
  | SetFilterBind
  | SetMarkUpListExpanded
  | SetMarkUpStyleList
  | SetCharWidthMap
  | SetContentPageWidth;
