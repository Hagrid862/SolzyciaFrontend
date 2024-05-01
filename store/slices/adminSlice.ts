import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface AdminState {
  categories: {
    id: number,
    name: string,
    icon: string,
    description: string
  }[];
  products: {
    id: number,
    name: string,
    description: string,
    price: number,
    category: number,
  }[];
  error: {type: string, message: string} | null;
}

const initialState: AdminState = {
  categories: [],
  products: [],
  error: null
}

export const createCategory = createAsyncThunk(
  'admin/category/create',
  async ({name, icon, description}: {name: string, icon: string, description: string}, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/category`, {
          name: name,
          icon: icon,
          description: description
        },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": 'application/json'
          }
        }
      )

      if (response.status == 200) {
        return thunkAPI.rejectWithValue("Kategoria dodana pomyślnie.");
      } else {
        return thunkAPI.rejectWithValue("Wystąpił błąd. Spróbuj ponownie później.");
      }
    } catch (e: any) {
      console.log(e)
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
)

const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.categories.push(action.payload)
        state.error = null
      })
      .addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
        state.error = {type: 'category', message: action.payload}
      })


}});

export default adminReducer.reducer;