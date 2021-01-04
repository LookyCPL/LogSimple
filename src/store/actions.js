export const setFilterList = (newList) => {
  return {
    type: "SET_FILTER_LIST",
    new: newList,
  };
};

export const setFrameList = (newList) => {
  return {
    type: "SET_FRAME_LIST",
    new: newList,
  };
};

export const uploadFile = (fileName) => {
  return {
    type: "UPLOAD_FILE",
    fileName: fileName,
  };
};

export const setFilterBound = (isBound) => {
  return {
    type: "SET_FILTER_BIND",
    isBound: isBound,
  };
};

export const setMarkUpList = (newList) => {
    return {
        type: "SET_MARK_UP_LIST",
        new: newList,
    }
};

export const setMarkUpListExpanded = () => {
    return {
        type: "SET_MARK_UP_LIST_EXPANDED",
    }
};

export const setMarkUpStyleList = (newList) => {
    return {
        type: "SET_MARK_UP_STYLE_LIST",
        new: newList,
    }
};

export const setHoverStyle = (isReset, newStyle) => {
  return isReset
    ? {
        type: "RESET_HOVER_STYLE",
      }
    : {
        type: "SET_HOVER_STYLE",
        new: newStyle,
      };
};

export const setModal = (isReset, modalStyle) => {
    return isReset
        ? {
            type: "RESET_MODAL",
        }
        : {
            type: "SET_MODAL_TYPE",
            new: modalStyle,
        };
};

export const setUploadedFile = (newFile) => {
    return {
        type: "SET_UPLOADED_FILE",
        new: newFile,
    }
};

export const setVarKeys = (newKeys) => {
    return {
        type: "SET_VARIABLE_KEYS",
        newKeys: newKeys,
    }
};

export const chosenKeyListHandle = (isDelete, key) => {
    return {
        type: "CHOSEN_KEY_LIST_HANDLE",
        isDelete: isDelete,
        key: key,
    }
};