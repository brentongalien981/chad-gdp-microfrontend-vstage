import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useChat from '../hooks/useChat';
import { MAX_NUM_TRIES } from '../data/data';


const SessionOptionsModal: React.FC = () => {

  const navigate = useNavigate();
  const { resetEverything } = useChat();

  const numChatSessions = parseInt(localStorage.getItem('numChatSessions') || '0');

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Chat session is done.<br />
          {`You've now used ${numChatSessions} of ${MAX_NUM_TRIES} chat sessions.`}<br />
          What would you like to do next?
        </p>
        <div>
          <Button onClick={() => navigate('/chad-profile')} className="me-2">View My Guy</Button>
          <Button onClick={resetEverything}>New Chat</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};


export default SessionOptionsModal;