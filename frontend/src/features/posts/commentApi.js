
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const posts_root = '/comments'


export const commentApi = createApi({
    reducerPath:'commentApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder)=>({
        addComment:builder.mutation({
            query:(body)=>{
                return{
                    url:`${posts_root}/`,
                    method:'POST',
                    data:body,
                };
            },
            async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                  apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                    // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                    const post = draft.find(post => post.id === postId)
                    if (post) {
                      post.reactions[reaction]++
                    }
                  })
                )
                try {
                  await queryFulfilled
                } catch {
                  patchResult.undo()
                }
              }
            })
        }),
    })


export const {
    useAddCommentMutation,
} = commentApi
