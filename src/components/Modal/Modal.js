import React from 'react';
import { getModal } from "../../utils/methods";
import { useDispatch } from "react-redux";
import "./Modal.scss";
import { UploadModal } from "./UploadModal";
import { setModal } from "../../store/actions";

export const Modal = (props) => {

    const dispatch = useDispatch();
    const resetModal = () => {
        dispatch(setModal(true));
    };

    const getModal = (type) => {
      switch (type) {
        case "UPLOAD_MODAL":
          return <UploadModal/>;
        default:
          return null;
      }
    };

    return (
            <div className={props.class} >
                <div className="bg" onClick={() => resetModal()}/>
                {getModal(props.modal)}
            </div>
    );
};