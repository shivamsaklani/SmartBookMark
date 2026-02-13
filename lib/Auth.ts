import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/types";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

/* ------------------ SLICE ------------------ */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state,action:PayloadAction<User>){
      state.user=action.payload
    },
    isLoading(state,action:PayloadAction<boolean>){
      state.loading= action.payload
    }
  },
});

export const {
  setUser,
  isLoading
} = authSlice.actions;
export default authSlice.reducer;