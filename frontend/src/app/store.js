
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi';
import { postsApi } from 'features/posts/postsApi';
import authReducer from '../features/auth/authSlice'
import postsReducer from 'features/posts/postsSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]:authApi.reducer,
    posts:postsReducer,
    [postsApi.reducerPath]:postsApi.reducer,
  },
})