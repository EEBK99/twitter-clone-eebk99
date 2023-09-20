import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: any;
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<{}>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    changeProfile: (state, action) => {
      state.currentUser.profilePicture = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout, changeProfile } =
  userSlice.actions;

export default userSlice.reducer;
