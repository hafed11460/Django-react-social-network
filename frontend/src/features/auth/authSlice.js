import { createSlice } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginUser(state,{payload}){
            state.user = payload.user
            localStorage.setItem('user', JSON.stringify(payload.user))
            localStorage.setItem('access', JSON.stringify(payload.tokens.access))
            localStorage.setItem('refresh', JSON.stringify(payload.tokens.refresh))

        },
        logout: (state) => {
            state.user = null

            localStorage.removeItem('user')
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        },
    },
    extraReducers: (builder) => {

    }
})

export const {
    setLoginUser,
    logout,
}= authSlice.actions

export default authSlice.reducer


export const selectCurrentUser = state=>state.auth.user