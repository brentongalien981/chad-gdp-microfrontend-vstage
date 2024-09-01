import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import useChat from '../hooks/useChat';
import './Chat.scss';
import TheModal from './TheModal';
import SessionOptionsModal from './SessionOptionsModal';

const Chat: React.FC = () => {
  const { messages, loading, isSessionDone, hasSeenTheGuy, errorMsg, sendMessage } = useChat();
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);


  // Handle sending messages
  const handleSend = (e: React.FormEvent) => {
    // Prevent page refresh
    e.preventDefault();

    // Prevent sending empty messages
    if (!input.trim()) {
      return;
    }

    // Use the custom hook to send message
    sendMessage(input);

    // Clear input field
    setInput('');
  };


  // Set chat session options.
  let sessionOptionsComponent = null;
  if (isSessionDone && hasSeenTheGuy) {
    // Once chat session is done, and the user has seen the guy already,
    // give option to navigate to the profile page
    // or create a new chat session.
    sessionOptionsComponent = (<SessionOptionsModal />);
  }


  // Animate to scroll to the latest message.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);


  // Set error alert.
  let errorModal = null;
  if (errorMsg.length > 0) {
    errorModal = <TheModal msg={errorMsg} />;
  }


  // Set the chat form.
  let chatForm = null;
  if (!isSessionDone) {
    chatForm = (
      <Form onSubmit={handleSend} className="p-3">
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary">Send</Button>
          </Col>
        </Row>
      </Form>
    );
  }


  // Return the component.
  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {/* Show spinner while loading */}
        {loading && <Spinner animation="border" />}
        <div className="offsetter-div"></div>

        {/* Ref div to be used by auto-scroll animation */}
        <div ref={messagesEndRef} />
      </div>

      {chatForm}

      {errorModal}
      {sessionOptionsComponent}
    </div>
  );
};

export default Chat;