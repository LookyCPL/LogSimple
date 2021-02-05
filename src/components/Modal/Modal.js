import React from "react";
import { useDispatch } from "react-redux";
import { UploadModal } from "../UploadModal/UploadModal";
import { resetModal } from "../../redux/actions/modalActions";
import "./Modal.scss";

export const Modal = (props) => {

  const dispatch = useDispatch();

  const getModal = (type) => {
    switch (type) {
      case "UPLOAD_MODAL":
        return <UploadModal />;
      default:
        return null;
    }
  };

  return (
    <div className={props.class}>
      <div className="bg" onClick={() => dispatch(resetModal())} />
      {getModal(props.modal)}
    </div>
  );
};
