import { Reducer } from 'redux';
import { ConfigTypes } from "../../types/configTypes";
import type { ConfigState, ConfigAction } from "../../types/configTypes";
import { configInitial } from "../initialState";

export const configReducer: Reducer<ConfigState, ConfigAction> = (state = configInitial, action: ConfigAction) => {
    switch (action.type) {
        case ConfigTypes.SET_FILTER_BIND:
            state.isFilterBound = action.payload;
            return state;
        case ConfigTypes.SET_MARK_UP_LIST_EXPANDED:
            const isExpanded = state.isMarkUpListExpanded;
            state.isMarkUpListExpanded = !isExpanded;
            return state;
        case ConfigTypes.SET_MARK_UP_STYLE_LIST:
            state.markUpStyleList = action.payload;
            return state;
        case ConfigTypes.SET_UPLOAD_CONTENT_SCROLL_UP:
            state.uploadContentScrollUp = action.payload;
            return {...state};
        default:
            return state;
    }
};

