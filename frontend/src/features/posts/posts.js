// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from 'features/baseUrl'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = JSON.parse(localStorage.getItem('access'))
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => 'posts/',
            providesTags: ["Post"]
        }),
        likePost: build.mutation({
            query: ({ postId }) => (
                {
                    url: `posts/`,
                    method: 'POST',
                    postId,
                }
            ),
        }),
        addPost: build.mutation({
            query: (body) => ({
                url: `posts/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Post"]


        }),
        getPost: build.query({
            query: (id) => `posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }],
        }),
        updatePost: build.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `post/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
            invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
        }),
        deletePost: build.mutation({
            query(id) {
                return {
                    url: `posts/${id}/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ["Post"]

        }),
    }),
})

export const {
    useGetPostsQuery,
    useAddPostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi