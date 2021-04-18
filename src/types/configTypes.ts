import { MarkUpStyle } from "./markUpListTypes";

export const ConfigTypes = {
  SET_FILTER_BIND: "SET_FILTER_BIND",
  SET_MARK_UP_LIST_EXPANDED: "SET_MARK_UP_LIST_EXPANDED",
  SET_MARK_UP_STYLE_LIST: "SET_MARK_UP_STYLE_LIST",
}

export interface Config {
  isUploaded: boolean
  isFilterBound: boolean
  isMarkUpListExpanded: boolean
  markUpStyleList: MarkUpStyle[]
}

export type ConfigState = Config

export interface SetFilterBind {
  type: typeof ConfigTypes.SET_FILTER_BIND
  payload: boolean
}

export interface SetMarkUpListExpanded {
  type: typeof ConfigTypes.SET_MARK_UP_LIST_EXPANDED
  payload: boolean
}

export interface SetMarkUpStyleList {
  type: typeof ConfigTypes.SET_MARK_UP_STYLE_LIST;
  payload: MarkUpStyle[]
}

export type ConfigActions =
  | SetFilterBind
  | SetMarkUpListExpanded
  | SetMarkUpStyleList
