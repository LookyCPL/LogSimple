import React from 'react';
import "./App.css";
import {Lobby} from "./Lobby.js";
import {Upload} from "./Upload.js";
import {Filter} from "./Filter";
import {Menu} from "./Menu.js";
import {Info} from "./Info.js";


/*

Data structure:

-- frameList (Object)
        -- class (Array[String])
        -- key (Array[String])
        -- data (Array[String])
        -- filterItemList (Array[Object])
                -- id (String)
                -- caseSens (Boolean)
                -- matchWord (Boolean)
                -- indexList (Array[Object])
                    -- id (String)
                    -- start (Integer)
                    -- end (Integer)
 */

export const MainPage = (props) => {


    const onClickHandler = (props) => {

        //let array = ["a", "b", "c"];
        //alert(array.indexOf("d"));
        // setFilterList(["shit", "hovno"]);
        //alert( dateTypeRecognizer("2020-10-20  [brnpr"));
        //alert(dataSeparateGet("188jjj--231", ["greg"]));
    };

    return (
        <div className={"main"}>
            <div className={"header"}>
                <Upload/>
            </div>
            <div className={"page"}>
                <Menu/>
                <div className={"content"}>
                    <div>
                        <Lobby/>
                        <button onClick={onClickHandler}>test</button>
                    </div>
                </div>
            </div>
            <Filter/>
        </div>
    );
};