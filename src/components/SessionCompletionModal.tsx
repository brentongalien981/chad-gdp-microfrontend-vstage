import React from 'react';
import { Modal } from 'react-bootstrap';

interface TheModalProps {
  msg: string;
}


const SessionCompletionModal: React.FC<TheModalProps> = ({ msg }) => {

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
    </Modal>
  );
};

export default SessionCompletionModal;