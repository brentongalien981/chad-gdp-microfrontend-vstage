import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface TheModalProps {
  msg: string;
}


const TheModal: React.FC<TheModalProps> = ({ msg }) => {

  const [isShown, setIsShown] = React.useState(true);

  const handleClose = () => {
    setIsShown(false);
  };

  return (
    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TheModal;