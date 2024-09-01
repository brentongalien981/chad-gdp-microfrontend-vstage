import React from 'react';
import Chat from '../components/Chat';
import { HOURS_TO_RESET_SESSION, MAX_NUM_TRIES } from '../data/data';
import { Link } from 'react-router-dom';

const ChatPage: React.FC = () => {

  // Use localStorage to get num of chat sessions.
  const numChatSessions: string = localStorage.getItem('numChatSessions') || "0";


  // Set default chat countent.
  let mainContent: JSX.Element = <Chat />;

  // If the user has used up all the chat attempts...
  if (parseInt(numChatSessions) >= MAX_NUM_TRIES) {

    // If it's time to reset the chat session after a certain number of hours...
    if (shouldChatSessionReset()) {
      // Allow the user to chat again by resetting the numChatSessions to 0.
      localStorage.setItem('numChatSessions', '0');
    } else {
      // Notify the user that they've used up all the chat attempts.
      mainContent = (
        <p>
          Oops. You've only got {MAX_NUM_TRIES} tries per {HOURS_TO_RESET_SESSION} hrs...<br />
          Try again then... Thanks for playing!<br /><br />
          Meanwhile, you can view your guy <Link to='/chad-profile'>here</Link>.
        </p>
      );
    }

  }


  return (
    <div>
      <h2 className="mb-4">Chat Page</h2>
      {mainContent}
    </div>
  );
};


function shouldChatSessionReset(): boolean {

  // Get the time the user last generated a guy's image.
  const lastGeneratedGuyTime: string = localStorage.getItem('lastGeneratedGuyTime') || (new Date()).getTime().toString();

  // Get the current time.
  const currentTime: number = new Date().getTime();

  // Calculate the difference in hours.
  const diffInHours = (currentTime - parseInt(lastGeneratedGuyTime)) / 1000 / 60 / 60;

  // If it has only been less than certain hours since the last image generation,
  // then return false.  
  if (diffInHours < HOURS_TO_RESET_SESSION) {
    return false;
  }

  return true;

}


export default ChatPage;