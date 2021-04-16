import React, { useState } from "react";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../homepage.css";
import CreatePostForm from "./createPostForm";
import CreateRequestForm from "./createRequestForm";

function CreatePostModal() {
  const [show, setShow] = useState(false);
  const [tag, setTag] = useState("Tag");
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setTag("Tag");
  };

  const handleSelect = (e) => {
    console.log(e);
    setTag(e);
  };

  const renderTooltip = (msg) => <Tooltip>{msg}</Tooltip>;

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={renderTooltip("Say something")}
      >
        <FileEarmarkPlusFill size={27} color="white" onClick={handleShow} />
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton
            id="dropdown-item-button"
            title={tag}
            variant="light"
            onSelect={handleSelect}
          >
            <h6 className="dropdown-header">Select post tag</h6>
            <Dropdown.Item eventKey="Request">Request</Dropdown.Item>
            <Dropdown.Item eventKey="Post">Post</Dropdown.Item>
          </DropdownButton>
          {(() => {
            if (tag == "Request")
              return <CreateRequestForm modalClose={handleClose} />;
            else if (tag == "Post")
              return <CreatePostForm modalClose={handleClose} />;
            else return <div></div>;
          })()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePostModal;
