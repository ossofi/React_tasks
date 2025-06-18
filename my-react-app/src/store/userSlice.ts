import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomUser } from '../pages/Home';

interface UserState {
  user: CustomUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CustomUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;