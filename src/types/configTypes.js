import { configInitial } from "../redux/initialState";

export const ConfigTypes = {
  SET_FILTER_BIND: "SET_FILTER_BIND",
  SET_MARK_UP_LIST_EXPANDED: "SET_MARK_UP_LIST_EXPANDED",
  SET_MARK_UP_STYLE_LIST: "SET_MARK_UP_STYLE_LIST",

};

export type ConfigState = configInitial;

export interface SetFilterBind {
  type: ConfigTypes.SET_FILTER_BIND;
  payload: boolean;
}

export interface SetMarkUpListExpanded {
  type: ConfigTypes.SET_MARK_UP_LIST_EXPANDED;
  payload: boolean;
}

export interface SetMarkUpStyleList {
  type: ConfigTypes.SET_MARK_UP_STYLE_LIST;
  payload: Array;
}

export type ConfigAction =
  | SetFilterBind
  | SetMarkUpListExpanded
  | SetMarkUpStyleList
