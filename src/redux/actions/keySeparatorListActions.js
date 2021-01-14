import { action } from "typesafe-actions";
import { KeySeparatorListTypes, SetVariableKeys, ChosenKeyListHandle } from "../../types/keySeparatorListTypes";

export const setVariableKeys = (payload: Array): SetVariableKeys => action(KeySeparatorListTypes.SET_VARIABLE_KEYS, payload);
export const chosenKeyListHandle = (payload: Object): ChosenKeyListHandle => action(KeySeparatorListTypes.CHOSEN_KEY_LIST_HANDLE, payload);
