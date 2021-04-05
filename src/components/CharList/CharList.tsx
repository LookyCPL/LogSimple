import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { charList } from "../../utils/valueList";
import {setCharWidthMap} from "../../redux/actions/configActions";

export const CharList = () => {

  const dispatch = useDispatch();

  const set = useEffect(() => {
    const map = new Map();
    charList.forEach((char) => {
      const element = document.getElementById(char);

      element && map.set(
              char,
          element.getBoundingClientRect().width
          )
        }
    );
    dispatch(setCharWidthMap(map));
  },[]);

  return (
    <div className={"char-list"}>
      {charList.map((char) => (
        <span id={char} key={char}>
          {char}
        </span>
      ))}
    </div>
  );
};
