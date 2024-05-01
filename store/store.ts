// In your store file
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import adminReducer from '@/store/slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;