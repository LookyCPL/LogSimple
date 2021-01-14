import React from "react";
import { useDispatch } from "react-redux";
import { UploadModal } from "../UploadModal/UploadModal";
import { setModal } from "../../redux/actions/modalActions";
import "./Modal.scss";

export const Modal = (props) => {

    const dispatch = useDispatch();
    
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
                <div className="bg" onClick={() => dispatch(setModal({isReset: true}))}/>
                {getModal(props.modal)}
            </div>
    );
};