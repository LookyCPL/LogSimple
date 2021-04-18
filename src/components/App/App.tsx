import React, { useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "../Filter/Filter";
import { Header } from "../Header/Header";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";
import { hoverConfig } from "../../redux/selectors/hoverSelectors";
import { selectModal } from "../../redux/selectors/modalSelectors";
import { Lobby } from "../Lobby/Lobby";

export const App = memo(() => {
  const hover = useSelector(hoverConfig);
  const modal = useSelector(selectModal);

    return (
    <div className={"main"}>
      <div className={"header"}>
        <Header />
      </div>
      <div className={"page"}>
        <Lobby />
      </div>
      <Filter />
      <Modal modal={modal} />
      <Hover hover={hover} />
    </div>
  );
});
