import type {ConfigState} from "./configTypes";
import type {FilterState} from "./filterTypes";
import type {FrameListState} from "./frameListTypes";
import {HoverState} from "./hoverTypes";
import {ModalState} from "./modalTypes";
import type {UploadedFileState} from "./uploadedFileTypes";
import type {KeySeparatorListState} from "./keySeparatorListTypes";
import type {MarkUpListState} from "./markUpListTypes";

export * from './configTypes';
export * from './filterTypes';
export * from './frameListTypes';
export * from './hoverTypes';
export * from './modalTypes';
export * from './uploadedFileTypes';
export * from './markUpListTypes';


export interface ReduxState {
    config: ConfigState,
    filterList: FilterState,
    frameList: FrameListState,
    hover: HoverState,
    modal: ModalState,
    uploadedFile: UploadedFileState,
    keySeparatorList: KeySeparatorListState,
    markUpList: MarkUpListState,
}
