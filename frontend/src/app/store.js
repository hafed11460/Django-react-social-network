
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi';
import authReducer from '../features/auth/authSlice'
import postsReducer from 'features/posts/postsSlice'
import { likeApi } from 'features/posts/likesApi';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]:authApi.reducer,
    posts:postsReducer,
    [likeApi.reducerPath]:likeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([authApi.middleware,likeApi.middleware]),
})