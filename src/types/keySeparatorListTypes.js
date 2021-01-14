import { keySeparatorListInitial } from "../redux/initialState";

export const KeySeparatorListTypes = {
  SET_VARIABLE_KEYS: "SET_VARIABLE_KEYS",
  CHOSEN_KEY_LIST_HANDLE: "CHOSEN_KEY_LIST_HANDLE",
};

export type KeySeparatorListState = keySeparatorListInitial;

export interface SetVariableKeys {
  type: KeySeparatorListTypes.SET_VARIABLE_KEYS;
  payload: Array;
}

export interface ChosenKeyListHandle {
  type: KeySeparatorListTypes.CHOSEN_KEY_LIST_HANDLE;
  payload: Object;
}

export type KeySeparatorListAction =
    | SetVariableKeys
    | ChosenKeyListHandle;
