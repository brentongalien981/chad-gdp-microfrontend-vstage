export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  isSessionDone: boolean;
  errorMsg: string;
  hasSeenTheGuy: boolean;
}