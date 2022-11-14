
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const auth_root = '/auth'


export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:axiosBaseQuery(),
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(body)=>{
                return{
                    url:`${auth_root}/login/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
        RegisterUser:builder.mutation({
            query:(body)=>{
                return{
                    url:`${auth_root}/register/`,
                    method:'POST',
                    data:body,
                };
            },
        }),
        LogoutUser:builder.mutation({
            query:()=>{
                return{
                    url:`${auth_root}/logout/`,
                    method:'POST',
                    data:{},
                };
            },
        })
    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation
} = authApi
