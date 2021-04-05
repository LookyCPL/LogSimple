const listGet = (type) => {
  switch (type) {
    case "KEY_TYPE":
      return keyTypeList;
    default:
      return [];
  }
};

const keyTypeList = [
  {
    key: "DATE_TYPES",
    value: "Date types",
  },
  {
    key: "VAR_TYPES",
    value: "Variable types",
  },
];

export const translateValue = (key, type) => {
  const valueList = listGet(type);

  for (let item of valueList) {
    if (item.key === key) return item.value;
  }
  return "";
};

export const allCharString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:;,-+*/#&@<>(){}[]§$\"|°%='_`";
export const charList = allCharString.split("");
export const averageCharLength = 8.27124543242402;