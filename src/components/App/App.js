import React from "react";
import { useSelector } from "react-redux";
import { Lobby } from "../Lobby.js";
import { Filter } from "../Filter/Filter";
import { MarkUpList } from "../MarkUpList/MarkUpList.js";
import { Header } from "../Header/Header.js";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";
import { selectConfig } from "../../redux/selectors/configSelectors";
import { hoverConfig } from "../../redux/selectors/hoverSelectors";
import {selectModal} from "../../redux/selectors/modalSelectors";

export const App = () => {

    const hover = useSelector(hoverConfig);
    const modal = useSelector(selectModal);
    const isMarkUpListExpanded = useSelector(selectConfig).isMarkUpListExpanded

    return (
      <div className={"main"}>
        <div className={"header"}>
          <Header />
        </div>
        <div className={"page"}>
          <MarkUpList
            isExpanded={isMarkUpListExpanded}
          />
          <div className={"content"}>
            <div>
              <Lobby />
            </div>
          </div>
        </div>
        <Filter />
        <Modal class={modal.class} modal={modal.type} />
        <Hover style={hover.style} title={hover.title} class={hover.class} />
      </div>
    );
};
