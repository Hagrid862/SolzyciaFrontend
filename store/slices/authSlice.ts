import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
  loginEmail: string;
  loginPassword: string;
}

const initialState: AuthState = {
  token: null,
  tokenValid: -1,
  user: null,
  error: null,
  loginEmail: "",
  loginPassword: "",
};

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}: {username: string, password: string}, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        username: username,
        password: password
      });

      if (response.status == 200) {

        return thunkAPI.fulfillWithValue({email: username, password: password});
      } else {
        return thunkAPI.rejectWithValue("An error occurred. Please try again later.");
      }

    }  catch (error: any) {
      const data = error.response.data;

      if (data.message == "Invalid username or password") {
        return thunkAPI.rejectWithValue("Invalid username or password");
      } else {
        return thunkAPI.rejectWithValue("An error occurred. Please try again later.");
      }
    }
  }
)

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        // handle the state when login is pending
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loginEmail = action.payload.email;
        state.loginPassword = action.payload.password;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        // handle the state when login is rejected
        state.error = action.payload;
      });
  }
});

export default authReducer.reducer