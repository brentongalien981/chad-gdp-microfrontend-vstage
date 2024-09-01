import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store'; // Update with actual path
import { sendMessageAsync, initChatAsync, resetMessagesAction, updateMessageContent, setFinalChatMsg, updateChatCompletionMsg, resetEverythingAction } from '../redux/chatSlice'; // Update with actual path
import { useEffect } from 'react';
import { Message } from '../redux/types';
import { useNavigate } from 'react-router-dom';
import { CHAT_COMPLETION_COUNT } from '../data/data';

const useChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // AppDispatch type for typed dispatch
  const messages = useSelector((state: RootState) => state.chat.messages);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const isSessionDone = useSelector((state: RootState) => state.chat.isSessionDone);
  const errorMsg = useSelector((state: RootState) => state.chat.errorMsg);
  const hasSeenTheGuy = useSelector((state: RootState) => state.chat.hasSeenTheGuy);


  const sendMessage = (message: string) => {
    // Prevent sending messages while loading
    if (isSessionDone || loading) { return; }

    // Append the new message to the array of messages.
    const currentMessages: Message[] = [...messages, { role: 'user', content: message }];
    dispatch(sendMessageAsync(currentMessages));
  };

  const initializeChat = () => {
    if (isSessionDone) {
      return;
    }
    dispatch(initChatAsync());
  };


  const resetMessages = () => {
    dispatch(resetMessagesAction());
    navigate('/chat');
  };


  const resetEverything = () => {
    dispatch(resetEverythingAction());
    navigate('/chat');
  };


  // Animate the message content.
  const animateMessage = (messageIndex: number, content: string) => {

    let charIndex = 0;

    const interval = setInterval(() => {

      if (charIndex < content.length) {
        const contentSlice: string = content.slice(0, charIndex + 1);
        dispatch(updateMessageContent({ messageIndex, content: contentSlice }));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust the speed as needed
  };


  // Animate countdown chat session completion message.
  const animateCountdownChatCompletion = () => {

    let countdown: number = CHAT_COMPLETION_COUNT;

    const interval = setInterval(() => {

      if (countdown > 0) {
        const lastChatMsg = `Chat session is done. Redirecting to your guy's profile in ${countdown} seconds...`;
        dispatch(updateChatCompletionMsg({ content: lastChatMsg }));
        countdown--;
      } else {
        navigate('/chad-profile');
        clearInterval(interval);
      }
    }, 1000);
  };


  // Initialize chat session.
  useEffect(() => {
    initializeChat(); // Instead of dispatching directly, use the custom hook
  }, [isSessionDone]);


  // Handle the animation of the new message.
  useEffect(() => {
    if (messages.length > 0 && !loading) {
      // Animating the last message.
      const messageIndex: number = messages.length - 1;
      const content: string = messages[messageIndex].content;
      animateMessage(messageIndex, content);
    }
  }, [messages.length, loading]);



  // Once chat session is done, and the user hasn't seen the guy yet,
  // animate the last chat message & navigate to the profile page.
  useEffect(() => {
    if (isSessionDone && !hasSeenTheGuy) {

      setTimeout(() => {
        const msg: Message = {
          role: "assistant",
          content: `Chat session is done. Redirecting to your guy's profile in ${CHAT_COMPLETION_COUNT} seconds...`
        };
        dispatch(setFinalChatMsg(msg));

        animateCountdownChatCompletion();
      }, (CHAT_COMPLETION_COUNT * 1000));
    }
  }, [isSessionDone, hasSeenTheGuy]);


  //
  return {
    messages,
    loading,
    isSessionDone,
    sendMessage,
    initializeChat,
    resetMessages,
    resetEverything,
    errorMsg,
    hasSeenTheGuy
  };
};

export default useChat;