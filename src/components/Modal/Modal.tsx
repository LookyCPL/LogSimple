import React from "react";
import { useDispatch } from "react-redux";
import { UploadModal } from "../UploadModal/UploadModal";
import { resetModal } from "../../redux/actions/modalActions";
import "./Modal.scss";
import { Modal as ModalType } from "../../types";

export interface ModalProps {
  modal: ModalType
}

export const Modal = (props: ModalProps) => {

  const dispatch = useDispatch();
  const { modal } = props;

  const getModal = (type: string) => {
    switch (type) {
      case "UPLOAD_MODAL":
        return <UploadModal />;
      default:
        return null;
    }
  };

  return (
    <div className={modal.class}>
      <div className="bg" onClick={() => dispatch(resetModal())} />
      {getModal(modal.type)}
    </div>
  );
};
