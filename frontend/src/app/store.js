
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]:authApi.reducer,
  },
})