import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BiogEditForm } from "./BiogEditForm";

function BiogEditModal({ item, updater }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" className="item-button" onClick={toggle}>
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit {item.title}</ModalHeader>
        <ModalBody>
          <BiogEditForm item={item} toggle={toggle} updater={updater} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default BiogEditModal;
