import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import NewsEditForm from "./NewsEditForm";

function NewsEditModal({ item, handleUpdate, isUpdating }) {
  const { register, handleSubmit } = useForm();
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" className="item-button" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit {item.headline}</ModalHeader>
        <ModalBody>
          <NewsEditForm item={item} toggle={toggle} updater={handleUpdate} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            className="item-button"
            onClick={() => handleUpdate}
          >
            Test
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewsEditModal;
