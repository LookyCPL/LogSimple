import React from "react";
import { useSelector } from "react-redux";
import { Lobby } from "../Lobby.js";
import { Filter } from "../Filter/Filter";
import { MarkUpList } from "../MarkUpList/MarkUpList.js";
import { Header } from "../Header/Header.js";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";

export const App = () => {

    const hoverStyle = useSelector((state) => state.hoverStyle);
    const modalStyle = useSelector((state) => state.modalStyle);

    return (
        <div className={"main"}>
            <div className={"header"}>
                <Header/>
            </div>
            <div className={"page"}>
                <MarkUpList
                    isExpanded={useSelector(
                        (state) => state.generalConfig.isMarkUpListExpanded
                    )}
                />
                <div className={"content"}>
                    <div>
                        <Lobby/>
                    </div>
                </div>
            </div>
            <Filter/>
            <Modal
                class={modalStyle.class}
                modal={modalStyle.type}
            />
            <Hover
                style={hoverStyle.style}
                title={hoverStyle.title}
                class={hoverStyle.class}
            />
        </div>
    );
};
