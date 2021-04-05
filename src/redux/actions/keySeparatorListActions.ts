import { action } from "typesafe-actions";
import {
    KeySeparatorListTypes,
    SetVariableKeys,
    ChosenKeyListHandle,
    Formatter, PickedKey
} from "../../types/keySeparatorListTypes";

export const setVariableKeys = (payload: Formatter[]): SetVariableKeys => action(KeySeparatorListTypes.SET_VARIABLE_KEYS, payload);
export const chosenKeyListHandle = (payload: PickedKey): ChosenKeyListHandle => action(KeySeparatorListTypes.CHOSEN_KEY_LIST_HANDLE, payload);
