import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  email: string;
}

const initialState: ProfileState = {
  name: '',
  email: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    }
  }
});

export const { setName, setEmail } = profileSlice.actions;
export default profileSlice.reducer;