
export const FrameListTypes = {
    SET_FRAME_LIST: "SET_FRAME_LIST",
};

export interface IndexItem {
    id: string
    start: number
    end: number
}

export interface FilterItem {
    id: string
    caseSens: boolean
    matchWord: boolean
    indexList: IndexItem[]
}

export interface FrameItem {
    index: number
    isMarked: boolean
    colorClass: string
    key: string
    data: string
    dataLengthList: number[]
    filterItemList: FilterItem[]
}

export type FrameListState = FrameItem[]


export interface SetFrameList {
  type: typeof FrameListTypes.SET_FRAME_LIST;
  payload: FrameListState;
}

export type FrameListAction =
  | SetFrameList
