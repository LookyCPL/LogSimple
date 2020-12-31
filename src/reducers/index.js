import {combineReducers} from "redux";

let initialObject = {
    isMarked: [false],
    colorClass: ["default"],
    class: ["hidden"],
    key: ["key1"],
    data: ["data1"],
    filterItemList: [[]],
};

const frameListReducer = (state = initialObject, action) => {
    if (action.type === "SET_FRAME_LIST") {
        return action.new;
    } else {
        return state;
    }
};

const filterListReducer = (state = [], action) => {
    if (action.type === "SET_FILTER_LIST") {
        return action.new;
    } else {
        return state;
    }
};

const allReducers = combineReducers({
    filterList: filterListReducer,
    frameList: frameListReducer,
});

export default allReducers;