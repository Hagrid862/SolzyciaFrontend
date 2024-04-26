import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  tokenValid: number;
  user: {
    id: string;
    email: string;
    username: string;
  } | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  tokenValid: -1,
  user: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, password: string }>) => {

    }
  }
});

export const { login } = authSlice.actions;