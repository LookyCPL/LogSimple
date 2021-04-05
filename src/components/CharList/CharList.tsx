import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { charList } from "../../utils/valueList";
import { setCharWidthMap } from "../../redux/actions/configActions";

export const CharList = () => {

  const dispatch = useDispatch();

  const set = useEffect(() => {
    const map = new Map();
    const temp: number[] = [];
    let count: number = 0.0;
    charList.forEach((char) => {
      const element = document.getElementById(char);
      if(element){
        element && temp.push(element.getBoundingClientRect().width);
        count += element.getBoundingClientRect().width;
        element && map.set(
            char,
            element.getBoundingClientRect().width
        )
      }
    })

    dispatch(setCharWidthMap(map));

    console.log('Total - ' + count);
    console.log('Length - ' + temp.length);
    console.log('Average - ' + count / temp.length);
    // console.log(temp);
    // console.log(count);
    // console.log(map);
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
