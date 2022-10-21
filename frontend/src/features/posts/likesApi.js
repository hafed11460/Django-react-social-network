// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'features/baseUrl'

export const likeApi = createApi({
    reducerPath: 'likeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = JSON.parse(localStorage.getItem('access'))
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    endpoints: (build) => ({
        addLike: build.mutation({
            query: (postId) => ({
                url: `posts/${postId}/set-like/`,
                method: 'POST',
                data:{}
            }),
        }),
    }),
})


export const {
    useAddLikeMutation,
} = likeApi