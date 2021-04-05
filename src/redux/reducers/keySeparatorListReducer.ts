import { Reducer } from "redux";
import { keySeparatorListInitial } from "../initialState";
import {Formatter, KeySeparatorListTypes, PickedKey} from "../../types/keySeparatorListTypes";
import type { KeySeparatorListAction, KeySeparatorListState } from "../../types/keySeparatorListTypes";

export const keySeparatorListReducer: Reducer<KeySeparatorListState, KeySeparatorListAction> = (state = keySeparatorListInitial, action: KeySeparatorListAction) => {
    switch (action.type) {
        case KeySeparatorListTypes.SET_VARIABLE_KEYS:
            const newVarKeys = {
                type: "VAR_TYPES",
                formatters: <Formatter[]>action.payload,
            };
            const temp = state.filter((s) => s.type !== "VAR_TYPES");
            temp.push(newVarKeys);
            return temp;
        case KeySeparatorListTypes.CHOSEN_KEY_LIST_HANDLE:
            const payload = <PickedKey>action.payload;
            for (let keyList of state) {
                if (keyList.type === payload.keyType) {
                    for (let formatter of keyList.formatters) {
                        if (formatter.value === payload.key) {
                            formatter.isPickedUp = payload.isPickedUp;
                            break;
                        }
                    }
                    break;
                }
            }
            return [...state];
        default:
            return state;
    }
};