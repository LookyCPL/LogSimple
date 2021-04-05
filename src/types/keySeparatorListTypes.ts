
export const KeySeparatorListTypes = {
  SET_VARIABLE_KEYS: "SET_VARIABLE_KEYS",
  CHOSEN_KEY_LIST_HANDLE: "CHOSEN_KEY_LIST_HANDLE",
};

export interface PickedKey {
  isPickedUp: boolean,
  keyType: string,
  key: string,
}

export interface Formatter {
  value: string
  isPickedUp: boolean
}

export interface KeySeparator {
  type: string
  formatters: Formatter[]
}
export type KeySeparatorListState = KeySeparator[]

export interface SetVariableKeys {
  type: typeof KeySeparatorListTypes.SET_VARIABLE_KEYS;
  payload: Formatter[];
}

export interface ChosenKeyListHandle {
  type: typeof KeySeparatorListTypes.CHOSEN_KEY_LIST_HANDLE;
  payload: PickedKey;
}

export type KeySeparatorListAction =
    | SetVariableKeys
    | ChosenKeyListHandle;
