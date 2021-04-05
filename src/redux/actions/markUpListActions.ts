import { action } from "typesafe-actions";
import { MarkUpListState, MarkUpListTypes, SetMarkUpList } from "../../types";

export const setMarkUpList = (payload: MarkUpListState): SetMarkUpList => action(MarkUpListTypes.SET_MARK_UP_LIST, payload);
