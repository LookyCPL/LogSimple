import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "../Filter/Filter";
import { MarkUpList } from "../MarkUpList/MarkUpList";
import { Header } from "../Header/Header";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";
import { hoverConfig } from "../../redux/selectors/hoverSelectors";
import { selectModal } from "../../redux/selectors/modalSelectors";
import { Lobby } from "../Lobby/Lobby";
import { setTopFrame } from "../../redux/actions/configActions";
import { selectConfig } from "../../redux/selectors/configSelectors";

export const App = () => {
  const hover = useSelector(hoverConfig);
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  const { lobbyConfig } = useSelector(selectConfig);
  const mainRef = useRef(null);

  const clickHandle = (index: number) => {
    const newTopFrame = lobbyConfig.frameHeightList.find(
      (fr) => fr.index === index
    );
    if (newTopFrame) {
      dispatch(setTopFrame(newTopFrame));
      // @ts-ignore
      mainRef.current.scrollTop = newTopFrame.top;
    }
  };

  return (
    <div className={"main"}>
      <div className={"header"}>
        <Header />
      </div>
      <div className={"page"}>
        <MarkUpList onClick={clickHandle} />
        <Lobby ref={mainRef} />
      </div>
      <Filter />
      <Modal modal={modal} />
      <Hover hover={hover} />
    </div>
  );
};
