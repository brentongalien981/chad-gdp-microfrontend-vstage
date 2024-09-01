import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from './types'; // Import the types

const initialState: ChatState = {
  messages: [],
  loading: false,
  isSessionDone: false,
  errorMsg: "",
  hasSeenTheGuy: false
};


//
export const initChatAsync = createAsyncThunk(
  'chat/initChatAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.chat_obj;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// Create an async thunk for sending a message
export const sendMessageAsync = createAsyncThunk(
  'chat/sendMessageAsync',
  async (currentMessages: Message[], { rejectWithValue }) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }


      // Set localStoreage vars.
      if (data.isSessionDone) {
        // Save the chadProfile to localStorage.
        const chadProfile = data.chad_profile;
        localStorage.setItem('chadProfile', JSON.stringify(chadProfile));
      }

      return {
        userMessage: currentMessages[currentMessages.length - 1].content,
        assistantMessage: data.chat_obj.content,
        isSessionDone: data.isSessionDone
      };
    } catch (error: any) {
      return rejectWithValue(error.message);

    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateMessageContent: (state, action: PayloadAction<{ messageIndex: number; content: string }>) => {
      const { messageIndex, content } = action.payload;
      if (state.messages[messageIndex]?.content) {
        state.messages[messageIndex].content = content;
      }
    },
    resetMessagesAction: (state) => {
      state.messages = [];
      state.isSessionDone = false;
    },
    setFinalChatMsg: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateChatCompletionMsg: (state, action: PayloadAction<{ content: string }>) => {
      const { content } = action.payload;
      const messageIndex = state.messages.length - 1;
      if (state.messages[messageIndex]?.content) {
        state.messages[messageIndex].content = content;
      }
    },
    setHasSeenTheGuy: (state, action: PayloadAction<boolean>) => {
      state.hasSeenTheGuy = action.payload;
    },
    resetEverythingAction: (state) => {
      state.isSessionDone = false;
      state.messages = [];
      state.errorMsg = "";
      state.hasSeenTheGuy = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle the initChatAsync action
      .addCase(initChatAsync.pending, (state) => {
        state.loading = true; // Set loading to true while waiting for response
        state.messages = []; // Clear messages on initialization
        state.errorMsg = ""; // Clear errorMsg on initialization
      })
      .addCase(initChatAsync.fulfilled, (state, action: PayloadAction<Message>) => {
        // Append the initialized message
        state.messages = [action.payload]
        state.loading = false;
      })
      .addCase(initChatAsync.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false; // Reset loading on error        
        state.errorMsg = `Oops. ${action.payload}.\nTry again maybe.`;
      })

      // Handle the sendMessageAsync action
      .addCase(sendMessageAsync.pending, (state) => {
        state.loading = true; // Set loading to true while waiting for response
        state.errorMsg = ""; // Clear errorMsg on initialization
      })
      .addCase(sendMessageAsync.fulfilled, (state, action: PayloadAction<{ userMessage: string, assistantMessage: string, isSessionDone: boolean }>) => {
        const { userMessage, assistantMessage, isSessionDone } = action.payload;

        // Add user's message
        state.messages.push({ role: 'user', content: userMessage });

        // Append AI's message
        state.messages.push({ role: 'assistant', content: assistantMessage });

        state.isSessionDone = isSessionDone;
        state.loading = false; // Set loading to false when response is received
      })
      .addCase(sendMessageAsync.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false; // Reset loading on error
        state.errorMsg = `Oops. ${action.payload}.\nTry again maybe.`;
      });
  },
});

export const { updateMessageContent, resetMessagesAction, setFinalChatMsg, updateChatCompletionMsg, setHasSeenTheGuy, resetEverythingAction } = chatSlice.actions;
export default chatSlice.reducer;