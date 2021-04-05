import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Lobby } from "../Lobby";
import { Filter } from "../Filter/Filter";
import { MarkUpList } from "../MarkUpList/MarkUpList";
import { Header } from "../Header/Header";
import { Hover } from "../Hover";
import { Modal } from "../Modal/Modal";
import { hoverConfig } from "../../redux/selectors/hoverSelectors";
import { selectModal } from "../../redux/selectors/modalSelectors";
import { setContentPageWidth } from "../../redux/actions/configActions";

export const App = () => {

    const dispatch = useDispatch();
    const hover = useSelector(hoverConfig);
    const modal = useSelector(selectModal);

    const setContentWidth = useEffect(() => {
        const content = document.getElementById('content');
        content && dispatch(setContentPageWidth(content.getBoundingClientRect().width));
    }, [])

    return (
      <div className={"main"}>
        <div className={"header"}>
          <Header />
        </div>
        <div className={"page"}>
          <MarkUpList />
          <div id={'content'} className={"content"}>
              <Lobby />
          </div>
        </div>
        <Filter />
        <Modal modal={modal} />
        <Hover hover={hover} />
      </div>
    );
};
