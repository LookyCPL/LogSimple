import React from "react";
import { useSelector } from "react-redux";
import { Filter } from "../Filter/Filter";
import { MarkUpList } from "../MarkUpList/MarkUpList";
import { Header } from "../Header/Header";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";
import { hoverConfig } from "../../redux/selectors/hoverSelectors";
import { selectModal } from "../../redux/selectors/modalSelectors";
import { Lobby } from "../Lobby/Lobby";

export const App = () => {
  const hover = useSelector(hoverConfig);
  const modal = useSelector(selectModal);

  return (
    <div className={"main"}>
      <div className={"header"}>
        <Header />
      </div>
      <div className={"page"}>
        <MarkUpList />
        <Lobby />
      </div>
      <Filter />
      <Modal modal={modal} />
      <Hover hover={hover} />
    </div>
  );
};
