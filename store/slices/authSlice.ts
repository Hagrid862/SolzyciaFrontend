import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "@/store/store";

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
      if (username == "" || password == "") {
        return thunkAPI.rejectWithValue("Prosze wypełnić wszystkie pola.");
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        username: username,
        password: password
      });

      if (response.status == 200) {
        return thunkAPI.fulfillWithValue({email: username, password: password});
      } else {
        return thunkAPI.rejectWithValue("Wystąpił błąd. Spróbuj ponownie później.");
      }

    }  catch (error: any) {
      const data = error.response.data;

      if (data.message == "Invalid username or password") {
        return thunkAPI.rejectWithValue("Nieprawidłowa nazwa użytkownika lub hasło.");
      } else {
        return thunkAPI.rejectWithValue("Wystąpił błąd. Spróbuj ponownie później.");
      }
    }
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async ({otp}: {otp: string}, thunkAPI) =>{
    try {
      if (otp.length != 8) {
        return thunkAPI.rejectWithValue("Niepoprawny kod weryfikacyjny.");
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify`, {
        username: (thunkAPI.getState() as RootState).auth.loginEmail,
        password: (thunkAPI.getState() as RootState).auth.loginPassword,
        code: otp
      });


      if (response.status == 200) {
        const data = response.data;
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue("Wystąpił błąd. Spróbuj ponownie później.");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Wystąpił błąd. Spróbuj ponownie później.");
    }
  }
);

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

    builder.addCase(verify.pending, (state) => {
      // handle the state when verify is pending
    })
    .addCase(verify.fulfilled, (state, action: PayloadAction<any>) => {
      // state.token = action.payload.token;
      state.token = action.payload.token;
      state.tokenValid = 1;
      localStorage.setItem('token', action.payload.token);
      // state.user = action.payload.user;

      state.loginEmail = "";
      state.loginPassword = "";
    })
    .addCase(verify.rejected, (state, action: PayloadAction<any>) => {
      // handle the state when verify is rejected
      state.error = action.payload;
    });
  }
});

export default authReducer.reducer