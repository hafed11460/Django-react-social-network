
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const posts_root = '/posts'


export const postsApi = createApi({
    reducerPath:'postsApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder)=>({
        createPost:builder.mutation({
            query:(body)=>{
                return{
                    url:`${posts_root}/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
    })
})

export const {
    useCreatePostMutation,
} = postsApi
