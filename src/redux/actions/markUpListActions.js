import { action } from "typesafe-actions";
import { MarkUpListTypes, SetMarkUpList } from "../../types/markUpListTypes";

export const setMarkUpList = (payload: Array): SetMarkUpList => action(MarkUpListTypes.SET_MARK_UP_LIST, payload);
