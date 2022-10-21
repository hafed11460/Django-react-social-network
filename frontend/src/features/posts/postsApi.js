
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const posts_root = '/posts'


export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (body) => {
                return {
                    url: `${posts_root}/`,
                    method: 'POST',
                    data: body,
                };
            },
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
        getUserPostsList: builder.query({
            query: (body) => {
                return {
                    url: `${posts_root}/user_posts/`,
                    method: 'GET',
                    data: {},
                };
            },
        }),
        getPostsList: builder.query({
            query: (body) => {
                return {
                    url: `${posts_root}/`,
                    method: 'GET',
                    data: {},
                };
            },
        }),
        addComment: builder.mutation({
            query: (comment) => ({
                url: `comments/`,
                method: 'POST',
                data: comment,
            }),

        })
    })
})

export const {
    useCreatePostMutation,
    useGetPostsListQuery,
    useGetUserPostsListQuery,
    useAddCommentMutation,
} = postsApi
